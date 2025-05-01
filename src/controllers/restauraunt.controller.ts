import { Request, Response } from "express";
import { MemberInput, LoginInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/members.enum";
import MemberService from "../models/Member.service";



const restaurantController: { [key: string]: any } = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try{
        res.render('home');  //home.ejs   
    }catch(err: any){
        console.error("Error in goHome:", err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    res.render("login");
};

restaurantController.getSignup = (req: Request, res: Response) => {
    res.render("signup");
};

// Signup (POST)
restaurantController.processSignup = async (req: Request, res: Response) => {
    
    try {
        console.log("processSignup - request body:", req);

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTARAUNT;
        const result = await memberService.processSignup(newMember); 
        
        res.status(201).json(result);
    } 
    
    catch (err: any) {
        console.error("Error in processSignup:", err);

        res.status(err.code || 500).json({
            code: err.code || 500,
            message: err.message || "An unexpected error occurred"
        });
    }
};

const memberService = new MemberService();

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("processLogin - request body:", req.body);

        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input);
        res.status(200).json(result);
    } 
    
    catch (err: any) {
        console.error("Error in processLogin:", err);

        res.status(err.code || 500).json({
            code: err.code || 500,
            message: err.message || "An unexpected error occurred"
        });
    }
};



export default restaurantController;