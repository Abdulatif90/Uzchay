import  path  from "path";
import fs from "fs";
import { v4 } from "uuid";
import { T } from "../types/common";
import multer from "multer";

// umumiy hollar uchun foydalanish mumkin bo`lgan function yoziladi

function getLargeImageStore (address: any) {
        return multer.diskStorage({
            destination: (req, file, cb) =>
                cb( null, `./uploads/${address}`),
            filename: (req, file, cb) =>{
                const extention = path.parse(file.originalname).ext;
                const random_name = v4() + extention;
                cb( null, random_name);
            }
        });
};

const makeUpLoader = (address:string) => {
    const storage = getLargeImageStore (address);
    return multer({storage:storage});
};

/*
// bu specific hollar uchun
const product_storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb (null, "./uploads/products");
    },
    filename: (req, file, cb) => {
        console.log(file);
        const extention  = path.parse(file.originalname).ext;
        const random_name = v4() + extention;
        cb( null, random_name)
    }
});
*/


export default makeUpLoader;