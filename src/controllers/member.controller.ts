
import { Request, Response } from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import {LoginInput, Member, MemberInput } from "../libs/types/member";
import {  MemberType } from "../libs/enums/members.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import bcrypt from "bcryptjs";
import AuthService from "../models/Auth.service";
import {token} from "morgan";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};

  memberController.signup = async (req: Request, res: Response)=>{
    try {
        const input: MemberInput = req.body,
        result: Member = await memberService.signup(input),
        token = await authService.createToken(result);
        res.json({member:result});

    } catch (err) {
        console.log("Error, signup", err);
    if(err instanceof Errors) 
        res.status(err.code).json({message: err.message});
    else res.status(Errors.standart.code).json(Errors.standart.message);
    };
};

memberController.login = async (req: Request, res: Response)=>{
    try {
        const input: LoginInput = req.body,
        result = await memberService.login(input),
        token = await authService.createToken(result);
        res.json({member:result, token});
    } catch (err) {
        console.log("Error, processLogin", err);
        res.json(err)
    }
};


export default memberController;
