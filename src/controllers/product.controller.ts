import { Request, Response } from 'express';
import Errors, { HttpCode, Message } from '../libs/Errors';
import {T} from '../libs/types/common';
import ProductService from '../models/Product.service';
import { ProductInput } from '../libs/types/product';
import { AdminRequest } from '../libs/types/member';

const productService = new ProductService();
const productController:T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
    try{
        console.log('getAllProducts');
        res.render('products')
    } catch(err){
        console.log('getAllProducts error', err);
        if (err instanceof Errors) {
            res.status(err.code).json({ message: err.message });
        }else {
            res.status(Errors.standart.code).json({ message: Errors.standart });
        }
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
        res.status(200).send(`<script>aler('${message}');window.location.replace('/admin/product/all')</script`);
    }
};

export default  productController; 