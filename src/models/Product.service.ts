import { ProductInput, Product } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/Errors";


class ProductService {
    private readonly productModel;
    
    constructor(){
        this.productModel= ProductModel
    }

    //**SPA  */


     //**BSSR  */  

    public async createProduct (input: ProductInput):Promise<Product>{
        try{
            return (await this.productModel.create(input)).toObject()
           
        }
        catch(err){
           console.log("err in CreateProduct ", err)
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATE_FAILED)
        }

        }
    };
 
   

   





    
export default  ProductService;