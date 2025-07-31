import { NextFunction, Request, Response } from "express";
import { MemberInput, LoginInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/members.enum";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/Errors";


const memberService = new MemberService();

const restaurantController: { [key: string]: any } = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try{
        res.render('home');  //home.ejs   
    }catch(err: any){
        console.error("Error in goHome:", err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try{
        res.render('signup');  //home.ejs   
    }catch(err: any){
        console.error("Error in goHome:", err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try{
        res.render('login');  //home.ejs   
    }catch(err: any){
        console.error("Error in goHome:", err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};


    // Signup (POST)
    restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    
    try {
        console.log("processSignup - request body:", req.body);
        const file = req.file;
        console.log("processSignup - file:", file);
         // Check if file is provided
        if(!file)
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

        const newMember: MemberInput = req.body;
        newMember.memberImage = file?.path;
        newMember.memberType = MemberType.RESTARAUNT;
        const result = await memberService.processSignup(newMember); 
        
        // TODO : SESSIONS AUTHENTICATION
        req.session.member = result; // Save the member data in the session
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session save error" });
            }
            console.log("Session data:", req.session.member); // Log the session data
            res.status(201).redirect("/admin/product/all");
        });
    } 
    
    catch (err: any) {
        console.error("Error in processSignup:", err);

        res.status(err.code || 500).json({
            code: err.code || 500,
            message: err.message || "An unexpected error occurred"
        });
    }
};



restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin - request body:", req.body);

        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input);
        
        req.session.member = result; // Save the member data in the session
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session save error" });
            }
            console.log("Session data:", req.session.member); // Log the session data
        });
        res.status(201).redirect("/admin/product/all");
    } 
    
    catch (err: any) {
        console.error("Error in processLogin:", err);

        res.status(err.code || 500).json({
            code: err.code || 500,
            message: err.message || "An unexpected error occurred"
        });
    }
}
    
restaurantController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout - request body:", req.body);
    req.session.destroy((err) => {  
        if (err) {
            console.error("Session destroy error:", err);
            return res.status(500).json({ message: "Session destroy error" });
        }
        res.status(200).json({ message: "Logout successful" });
    });
    } catch (err: any) {    
        console.error("Error in logout:", err);
        res.status(err.code || 500).json({
            code: err.code || 500,
            message: err.message || "An unexpected error occurred"
        });
    }
}

    //** SPA */USERS

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers")
    const result = await memberService.getUsers();
    res.render("users",{users: result});
    //user  degan page jonatib users degan objectdi  result olqali pas qilishini sorayyapmiz 
  }catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
    try{
    const result = await memberService.updateChosenUser(req.body);
    console.log('updateChosenUser result:', result);
    res.status(200).json({data: result});   
     }
    catch(err){
        console.log('err in updateUser ', err)
        if (err instanceof Errors) {
            res.status(err.code).json({ message: err.message });
        }else {
            res.status(Errors.standard.code).json({ message: Errors.standard });
        }
    }
};


restaurantController.checkAuthSession = async (
    req: AdminRequest, 
    res: Response)=>{
    try {
        if(req.session?.member) {
            res.status(201).send(`<script>alert("Hi, welcome to ${req.session.member.memberNick}")</script>`
            )
        } else {
            res.status(401).send({message: "Unauthorized"});
        }
    } catch (err) {
        console.log("Error, processLogin", err);
        res.send(err)
    }
}


restaurantController.veryfyRestaurant =  (
    req: AdminRequest, 
    res: Response,
    next: NextFunction
    )=>{
     if(req.session?.member?.memberType === MemberType.RESTARAUNT) {
            req.member = req.session.member; // Assign the member to the request object,
            next(); // Call the next middleware or route handler
        } else {
            res.status(401).send({message: "Unauthorized"});
        }
   };





export default restaurantController;