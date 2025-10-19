import { token } from "morgan";
import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";
import Errors, { HttpCode, Message } from "../libs/Errors";

class AuthService {
    private readonly secretToken;
    constructor() {
        this.secretToken = process.env.SECRET_TOKEN as string || "";
        if (!this.secretToken) {
            console.error("SECRET_TOKEN not found in environment variables");
            throw new Error("SECRET_TOKEN is required");
        }
    }

    public async createToken(payload: Member) {
        return new Promise((resolve, reject) => {
            const duration = `${AUTH_TIMER}h`;
            
            // Create a plain object with only serializable properties
            const tokenPayload = {
                _id: payload._id.toString(),
                memberType: payload.memberType,
                memberStatus: payload.memberStatus,
                memberNick: payload.memberNick,
                memberPhone: payload.memberPhone,
                memberAddress: payload.memberAddress,
                memberDesc: payload.memberDesc,
                memberImage: payload.memberImage,
                memberPoints: payload.memberPoints
            };
            
            jwt.sign(
                tokenPayload,
                this.secretToken, 
                {
                 expiresIn: duration,   
                },
                (err, token)=>{
                    if(err) {
                        console.error("JWT Sign Error:", err);
                        reject( new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
                    ); 
                    } else resolve (token as string);
                }
            )


        })
    }
    public async checkAuth(token: string): Promise<Member> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                this.secretToken,
                (err, decoded) => {
                    if (err) {
                        reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_NOT_VALID));
                    } else {
                        resolve(decoded as Member);
                    }
                }
            );
        });
    }
}

export default AuthService;