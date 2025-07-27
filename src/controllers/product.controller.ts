import { Request, Response } from 'express';
import Errors, { HttpCode, Message } from '../libs/Errors';
import {T} from '../libs/types/common';
import ProductService from '../models/Product.service';
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { ProductCollection } from   '../libs/enums/products.enum';
import { AdminRequest, ExtendedRequest  } from '../libs/types/member';
import { shapeIntoMongooseObjectId } from '../libs/config';

const productService = new ProductService();
const productController:T = {};


/** SPA **/

 productController.getProducts = async (req: Request, res:Response) => {
    try{
        console.log("getProducts");       
        const {page, limit, order, productCollection, search} = req.query;
        const inquiry: ProductInquiry = {
            order: String(order),
            page: Number(page),
            limit: Number(limit),
        };
        if(productCollection) inquiry.productCollection = productCollection as ProductCollection;

        if(search) inquiry.search = String(search);

        const result = await productService.getProducts(inquiry)

        res.status(HttpCode.OK).json(result)
    } catch(err){
        console.log("ERROR, getProducts", err);
        if( err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart )
        // res.json({})
        
    }
    
 }

  productController.getProduct = async (req: ExtendedRequest, res:Response) => {
     
    try{
        console.log("getProduct");       
        const {id} = req.params;
        console.log(req.member)
        const memberId = req.member?._id ? shapeIntoMongooseObjectId(req.member._id) : null;
        const result = await productService.getProduct(memberId, id)
        res.status(HttpCode.OK).json(result)
        
    } catch(err){
        console.log("ERROR, getProduct", err);
        if( err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart )
    }
 }





/** SSR**/


productController.getAllProducts = async (req: Request, res: Response) => {
    try{
        const data  =  await productService.getAllProducts();
        res.render('products',{ products : data});
    
    } catch(err){
        console.log('getAllProducts error', err);
        if (err instanceof Errors) {
            res.status(err.code).json({ message: err.message });
        }else {
            res.status(Errors.standart.code).json({ message: Errors.standart });
        }
    }
};



productController.createProduct = async (req: AdminRequest, res: Response) => {
    try{
        console.log('createProduct', req.body);
        console.log(req.files);
        if(!req.files?.length) 
        throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED)
        
       const data: ProductInput = req.body;
       data.productImages = req.files?.map((ele) =>{
        return ele.path.replace(/\\/g,"/")
       }); 
       
       console.log(data)
       await productService.createProduct(data);

        res.send(`<script>alert("successfully created new product");window.location.replace('admin/product/all')</script>`)
   
    }catch(err){
        console.log('createProduct error', err);
        const message = err instanceof Errors? err.message : Message.SOMETHING_WENT_WRONG;
        res.status(200).send(`<script>alert('${message}');window.location.replace('/admin/signup')</script>`);
    }
};

productController.updateProduct = async (req: Request, res: Response) => {
    try{
        console.log('updateProduct', req.params.id);
        const id = req.params.id;
        console.log(id);

        const result = await productService.updateProduct(id,req.body)
        res.status(200).json({ data : result})
    } catch(err){
        console.log('updateProduct error', err);
        if (err instanceof Errors) {
            res.status(err.code).json({ message: err.message });
        }else {
            res.status(Errors.standart.code).json({ message: Errors.standart });
        }
    }
};
export default  productController; 