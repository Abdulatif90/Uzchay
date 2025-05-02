import { Request, Response } from 'express';
import Errors, { Message } from '../libs/Errors';
import {T} from '../libs/types/common';
import ProductService from '../models/Product.service';

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
        
    } catch(err){
        console.log('updateProduct error', err);
        if (err instanceof Errors) {
            res.status(err.code).json({ message: err.message });
        }else {
            res.status(Errors.standart.code).json({ message: Errors.standart });
        }
    }
};

productController.createProduct = async (req: Request, res: Response) => {
    try{
        console.log('createProduct', req.body);
        res.send("uploading is successfully done")
    }catch(err){
        console.log('createProduct error', err);
        if (err instanceof Errors) {
            res.status(err.code).json({ message: err.message });
        }else {
            res.status(Errors.standart.code).json({ message: Errors.standart });
        }
    };
}

export default  productController; 