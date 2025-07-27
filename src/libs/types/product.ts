import { ObjectId } from "mongoose";
import { 
    ProductCollection,
    ProductSize, 
    ProductStatus } from "../enums/products.enum";


    export interface Product{
        _id: ObjectId,
        productStatus: ProductStatus,
        productCollection : ProductCollection,
        productName: String,
        productPrice: Number,
        productCount: Number,
        productLeftCount?: Number,
        productSize: ProductSize,
        productVolume: Number,
        productDesc?: String,
        productImages: String[],
        productviews?: Number
    }
    

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection? : ProductCollection;
    search?: string;
}
    

    export interface ProductInput{
        productStatus?: ProductStatus,
        productCollection : ProductCollection,
        productName: String,
        productPrice: Number,
        productLeftCount?: Number,
        productSize?: ProductSize,
        productVolume?: Number,
        productDesc?: String,
        productImages?: String[],
        productviews?: Number
    }
    

    export interface updateProductInput{
        _id:ObjectId,
        productStatus?: ProductStatus,
        productCollection? : ProductCollection,
        productName?: String,
        productPrice?: Number,
        productLeftCount?: Number,
        productSize?: ProductSize,
        productVolume?: Number,
        productDesc?: String,
        productImages?: String[],
        productviews?: Number
    }
    