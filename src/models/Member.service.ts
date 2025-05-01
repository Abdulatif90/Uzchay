import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/members.enum";
import bcrypt from "bcryptjs";

class MemberService {
   
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    public async signup(input: MemberInput): Promise<Member> {

        const salt = await bcrypt.genSalt(10);
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result.toJSON() as Member;
        }
        
        catch (err) { 
            console.error("Signup Error:", err);
            throw new Errors(HttpCode.UNAUTHORIZED, Message.USED_NICK_PHONE  );
        }
    }

    // Tizimga kirish (Login)
    public async login(input: LoginInput): Promise<Member> {
            const member = await this.memberModel
                .findOne(
                    { memberNick: input.memberNick },
                    {memberNick: 1, memberPassword: 1, memberType: 1})
                .exec();
             console.log("processLogin - member:", member);       
            if (!member) {
                throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
            }
            const isMatch = await bcrypt.compare(
                input.memberPassword,
                member.memberPassword);
            
            if (!isMatch) {
                throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
            }
            member.memberPassword = "";
            if (member.memberType !== 'USER') {
                throw new Errors(HttpCode.UNAUTHORIZED, Message.UNAUTHORIZED_ACCESS);
            }
            const memberId = await this.memberModel
                .findById(member._id).lean()
                .exec();
            if (!memberId) {
                throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_FOUND);
            }

            return member.toObject() as Member;
        };
   
    public async processSignup(input: MemberInput): Promise<Member> {

        const exist = await this.memberModel
            .findOne({ memberType: MemberType.RESTARAUNT })
            .exec();
        
        if (exist) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }

        const salt = await bcrypt.genSalt(10);
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        try {
         
            const result = await this.memberModel.create(input);

           
            result.memberPassword = "";

            return result.toObject() as Member;
        } catch (err) {
            console.error("Signup Error:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    // Tizimga kirish (Login)
    public async processLogin(input: LoginInput): Promise<Member> {
        console.log("processLogin - input:", input);
        try {
            const member = await this.memberModel
                .findOne({ memberNick: input.memberNick })
                .select("+memberPassword") 
                .exec();
            console.log("processLogin - member:", member);
            if (!member) {
                throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
            }
            const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);
            if (!isMatch) {
                throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
            }
            member.memberPassword = "";
            return member.toObject() as Member;
        } catch (err) {
            console.error("Login Error:", err);
            throw err;
        }
    }
};



export default MemberService;