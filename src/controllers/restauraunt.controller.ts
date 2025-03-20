import { Request, Response } from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/members.enum";

 
const restaurauntController: T = {};
restaurauntController.goHome = (req: Request, res: Response) => {
  {
    try {
        console.log("goHome");
        res.send("Homepage");
        // send | json | end | render | redirect
    } catch (err) {
      console.log("ERROR on goHome:", err)
    }
  }
};

restaurauntController.getLogin = (req: Request, res: Response) => {
    {
      try {
          console.log("getLogin");
          res.send("Login Page");
      } catch (err) {
        console.log("ERROR on getLogin:", err)
      }
    }
  };

  restaurauntController.getSignup = (req: Request, res: Response) => {
    {
      try {
        console.log("getSignup");
        res.send("Signup");
      } catch (err) {
        console.log("ERROR on getSignup:", err)
      }
    }
  };

  restaurauntController.processLogin = async(req: Request, res: Response) => {
    {
      try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input:LoginInput =req.body;


        const memberService = new MemberService();
        const result = await memberService.processLogin(input)
        res.send(result)
      } catch (err) {
        console.log("ERROR on processLogin:", err)
      }
    }
  };

  restaurauntController.processSignup = async (req: Request, res: Response) => {
  
      try {
        console.log("processSignup");
        console.log("body:", req.body);

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTARAUNT;

        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember)

        res.send(result)
      } catch (err) {
        console.log("ERROR on processSignup:", err)
        res.send(err);
      }
    }




export default restaurauntController;