import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput,UpdateMemberInput} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType, MemberStatus } from "../libs/enums/members.enum";
import {shapeIntoMongooseObjectId} from "../libs/config"
import bcrypt from "bcryptjs";

class MemberService {
    static addUserPoint() {
        throw new Error("Method not implemented.");
    }
    private readonly memberModel;
    constructor(){
        this.memberModel = MemberModel;
    }

public async getRestaurant():Promise <Member>{
   const result = await this.memberModel.
   findOne({memberType:MemberType.RESTARAUNT})
   .lean()
   .exec();
   console.log("getRestaurant - result:", result);
    if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result as Member;
}


    public async signup(input: MemberInput): Promise<Member> {

        // Validate required fields
        if (!input.memberPassword) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND);
        }

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
                    {memberNick:input.memberNick, memberStatus: {$ne: MemberStatus.DELETE}}, //
                    {memberNick: 1,memberPassword:1, memberStatus:1, memberType: 1}
                )
                .exec();
             console.log("processLogin - member:", member);       
           if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
           else if (member.memberStatus === MemberStatus.BLOCK) {
               throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
           }
            const isMatch = await bcrypt.compare(
                input.memberPassword,
                member.memberPassword);
            
            if (!isMatch) {
                throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
            }
            member.memberPassword = "";
            if (member.memberType !== MemberType.USER) {
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
        
    public async getMemberDetail(member:Member):Promise<Member> {
         const memberId = shapeIntoMongooseObjectId(member._id);
         const result = await this.memberModel.findOne({ _id: memberId, memberStatus:MemberStatus.ACTIVE})
         .exec();
         if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
         return result.toObject() as Member;
};


    public async updateMember(member:Member, input:MemberInput):Promise <Member>{
        const memberId = shapeIntoMongooseObjectId(member._id);
        
        // Hash password if provided
        if (input.memberPassword) {
            const salt = await bcrypt.genSalt(10);
            input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
        }
        
        const result = await this.memberModel.
            findOneAndUpdate({_id :  memberId},input, {new :true})
            .exec();
        if(!result)
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
        return result.toObject() as Member;
    }


public async getTopUsers(): Promise<Member[]> {
    const result = await this.memberModel
    .find({
        memberStatus: MemberStatus.ACTIVE,
        memberPoints : { $gte:1 }
    })
    .sort({ memberPoints: -1 })
    .limit(4)
    .exec();
    if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result as Member[];
}

public async addUserPoint(member: Member, point: number): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);

    const result = await this.memberModel
      .findOneAndUpdate(
        {
          _id: memberId,
          memberType: MemberType.USER,
          memberStatus: MemberStatus.ACTIVE,
        },
        { $inc: { memberPoints: point } },
        { new: true }
      )
      .exec();

    if (!result) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_FOUND);
    }

    return result.toObject() as Member;
  }

    public async processSignup(input: MemberInput): Promise<Member> {

        const exist = await this.memberModel
            .findOne({ memberType: MemberType.RESTARAUNT })
            .exec();
        
        if (exist) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }

        // Validate required fields
        if (!input.memberPassword) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND);
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



//** SPA */

public async getUsers(): Promise<Member[]>{
     try {
            const result = (await this.memberModel
            .find({memberType:MemberType.USER})
            .exec()
           
        );
        console.log("getUsers - result:", result);
        if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_FOUND)
        return result as Member[]
    }
    
    catch (err) { 
        console.error("Signup Error:", err);
        throw new Errors(HttpCode.UNAUTHORIZED, Message.USED_NICK_PHONE  );
    }
}

    public async updateChosenUser(
        data: UpdateMemberInput): Promise<Member>{
        const salt = await bcrypt.genSalt(10);
        data.memberPassword = data.memberPassword ? await bcrypt.hash(data.memberPassword, salt) : undefined;
        const id= shapeIntoMongooseObjectId(data._id)    
        const result =  await this.memberModel
        .findByIdAndUpdate(id, data, { new: true})
        .exec();
        if(!result) throw new Errors(HttpCode.NOT_MODIFIED,Message.UPDATE_FAILED)
        
    return result.toObject()
       
    }  
};




export default MemberService;