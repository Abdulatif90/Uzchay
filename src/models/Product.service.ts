import { ProductInput, Product, updateProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";


class ProductService {
    private readonly productModel;
    
    constructor(){
        this.productModel= ProductModel
    }

    //**SPA  */


     //**BSSR  */  
     public async getAllProducts(): Promise<Product[]>{
           
        const result =  await this.productModel
        .find()
        .exec();
        if(!result) throw new Errors(HttpCode.NOT_FOUND,Message.NO_DATA_FOUND)
        
    return result.map((doc) => doc.toObject())
       
    }

    public async createProduct (input: ProductInput):Promise<Product>{
        try{
            return (await this.productModel.create(input)).toObject()
           
        }
        catch(err){
           console.log("err in CreateProduct ", err)
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