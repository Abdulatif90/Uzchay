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
        console.log("Query params:", req.query);
        const {page, limit, order, productCollection, search} = req.query;
        
        const inquiry: ProductInquiry = {
            order: String(order || "createdAt"),
            page: Number(page) || 1,
            limit: Number(limit) || 8,
        };
        
        if(productCollection) inquiry.productCollection = productCollection as ProductCollection;
        if(search) inquiry.search = String(search);

        console.log("Final inquiry:", inquiry);
        const result = await productService.getProducts(inquiry)

        res.status(HttpCode.OK).json(result)
    } catch(err){
        console.log("ERROR, getProducts", err);
        if( err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard )
        // res.json({})
        
    }
    
 }

  productController.getProduct = async (req: ExtendedRequest, res:Response) => {
     
    try{
        console.log("getProduct");       
        const {id} = req.params;
        console.log("Product ID received:", id);
        console.log("Member info:", req.member);
        
        // Validate ID format first
        if (!id || id.length !== 24) {
            return res.status(HttpCode.BAD_REQUEST).json({
                code: HttpCode.BAD_REQUEST,
                message: "Invalid product ID format"
            });
        }
        
        const memberId = req.member?._id ? shapeIntoMongooseObjectId(req.member._id) : null;
        const result = await productService.getProduct(memberId, id)
        res.status(HttpCode.OK).json(result)
        
    } catch(err){
        console.log("ERROR, getProduct", err);
        if( err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard )
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
            res.status(Errors.standard.code).json({ message: Errors.standard });
        }
    }
};



productController.createProduct = async (req: AdminRequest, res: Response) => {
    try{
        console.log('createProduct', req.body);
        console.log('req.files:', req.files);
        
       const data: ProductInput = req.body;
       
       // Handle file uploads - only set if files exist
       if(req.files && req.files.length > 0) {
           data.productImages = req.files.map((ele: any) => {
               return ele.path.replace(/\\/g,"/");
           }); 
       } else {
           data.productImages = []; // Set empty array if no files
       }
       
       // Set required fields with defaults if not provided
       if (!data.productLeftCount) {
           data.productLeftCount = 0;
       }
       
       // productCount is required by schema but missing from form
       if (!data.productCount) {
           data.productCount = data.productLeftCount || 0;
       }
       
       console.log('Final data:', data);
       await productService.createProduct(data);

        res.send(`<script>alert("successfully created new product");window.location.replace('/admin/product/all')</script>`)
   
    }catch(err){
        console.log('createProduct error', err);
        const message = err instanceof Errors? err.message : Message.SOMETHING_WENT_WRONG;
        res.status(200).send(`<script>alert('${message}');window.location.replace('/admin/product/all')</script>`);
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
            res.status(Errors.standard.code).json({ message: Errors.standard });
        }
    }
};
export default  productController; 