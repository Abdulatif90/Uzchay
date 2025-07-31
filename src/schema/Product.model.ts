import mongoose, {Schema} from "mongoose";
import { ProductCollection, ProductSize, ProductStatus, ProductVolume } from "../libs/enums/products.enum";

const productSchema = new Schema (
    {
    productStatus: {
        type: String,
        enum : ProductStatus,
        default: ProductStatus.PROCESS
    },

    productCollection: {
        type: String,
        enum: ProductCollection,
        required : true,
    },
    
    productName: {
        type: String,
        required: true,
    },

    productPrice: {
        type: Number,
        required: true,
    },

    productCount: {
        type: Number,
        required: true,
    },

    productLeftCount: {
        type: Number,
        required: true,
        default: 0
    },

    productSize: {
        type: String,
        enum: ProductSize,
        default: ProductSize.NORMAL
    },

    productVolume: {
        type: Number,
        enum: ProductVolume,
        default: ProductVolume.ONE
    },

    productDesc: {
        type: String, 
    },

    productImages: {
        type: [String],  // bu arrray bolganligi uchun shunaqa yoziladi
        default: [],
    },

    productViews : {
        type: Number,
        default: 0,
    },
    },
    {timestamps: true}, // updateAt, createAt
);

productSchema.index({
    productName: 1,
    productSize: 1,
    productVolume: 1,
},
    {unique: true},
);

export default mongoose.model("product", productSchema);



