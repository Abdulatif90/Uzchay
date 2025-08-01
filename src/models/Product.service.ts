import { ProductInput, Product, updateProductInput, ProductInquiry  } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { T } from "../libs/types/common";
import { ProductStatus } from  "../libs/enums/products.enum";
import {ObjectId} from "mongoose"
import ViewService from "../models/View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";




class ProductService {
    private readonly productModel;
    public viewService: ViewService;

    constructor(){
        this.productModel= ProductModel
        this.viewService = new ViewService();
    }

    //**SPA  */
 public async getProducts(inquiry:ProductInquiry):Promise<Product[]>{
        const match: T = {productStatus: ProductStatus.PROCESS};

        if(inquiry.productCollection)
            match.productCollection = inquiry.productCollection;

        if(inquiry.search) {
            match.productName = {$regex: new RegExp(inquiry.search, "i")};
        }

        const sort: T = inquiry.order === "productPrice"
         ? {[inquiry.order] : 1}
         : {[inquiry.order] : -1};

         // Ensure page and limit are valid numbers
         const page = Math.max(1, inquiry.page || 1);
         const limit = Math.max(1, inquiry.limit || 8);

         const result = await this.productModel.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: (page - 1) * limit},
            {$limit: limit},
         ])
         .exec();

         return result || [];

    }

      public async getProduct(memberId: ObjectId | null, id: string):Promise<Product>{
        try {
            const productId = shapeIntoMongooseObjectId(id);
            
            // First, let's check if the product exists with any status
            const anyProduct = await this.productModel.findById(productId).exec();
            if (anyProduct) {
                // console.log("ProductService.getProduct - Product status:", anyProduct.productStatus);
            }
            
            let result  = await this.productModel.findOne({
                _id : productId,
                productStatus: ProductStatus.PROCESS,
            })
            .exec();

            if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

            if(memberId) {
                //Check existence
                const input: ViewInput = {
                    memberId: memberId,
                    viewRefId: productId,
                    viewGroup : ViewGroup.PRODUCT
                };
                
                const existView = await this.viewService.checkViewExistence(input);
                
                if(!existView) {
                    // Insert View
                    await this.viewService.insertMemberView(input);

                    // Increase Counts
                    result = await this.productModel.findByIdAndUpdate(
                        productId,
                        { $inc: { productViews: +1 }},
                        { new: true }
                    );
                }
            }

            if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
            return result.toObject() as Product;
        } catch (err) {
            if (err instanceof Errors) {
                throw err;
            }
            // If it's a MongoDB ObjectId error or other error
            throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND);
        }
    }

     //**BSSR  */  
     public async getAllProducts(): Promise<Product[]>{
           
        const result =  await this.productModel
        .find()
        .exec();
        
        return result.map((doc) => doc.toObject())
       
    }

    public async createProduct (input: ProductInput):Promise<Product>{
        try{
            return (await this.productModel.create(input)).toObject() as Product
           
        }
        catch(err){
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATE_FAILED)
        }

        }

    public async updateProduct(
        id:String,
        input: updateProductInput): Promise<Product>{
        id= shapeIntoMongooseObjectId(id)    
        const result =  await this.productModel
        .findOneAndUpdate({_id: id}, input, { new: true})
        .exec();
        if(!result) throw new Errors(HttpCode.NOT_MODIFIED,Message.UPDATE_FAILED)
        
    return result.toObject()
       
    }  
};
 
   

   





    
export default  ProductService;