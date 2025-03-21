import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/members.enum";
import * as bcrypt from "bcryptjs";

class MemberService {
    static processLogin(newMember: MemberInput) {
      throw new Error("Method not implemented.");
    }
    static processSignup(newMember: MemberInput) {
      throw new Error("Method not implemented.");
    }
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel
            .findOne({ memberType: MemberType.RESTARAUNT })
            .exec();
        
        if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

        const salt = await bcrypt.genSalt()
        input.memberPassword = await bcrypt.hash(input.memberPassword,salt)


        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result.toObject() as Member;
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
            .findOne({ memberNick: input.memberNick })
            .select("memberPassword") 
            .exec();
    
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    
        const isMatch = await bcrypt.compare(input.memberPassword,member.memberPassword)
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }
    
     
        member.memberPassword = "";
    
        return member.toObject() as Member;
    }
    
}

export default MemberService;