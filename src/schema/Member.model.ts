// Desc: Member Schema for MongoDB
// schema - bu MongoDB yoki boshqa NoSQL bazasida ma'lumotlar tuzilmasini aniqlovchi ma'lumotlar turi.
import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/members.enum";

// Build type: Schema First vs Code First
const memberSchema = new Schema(
  //memberType - foydalanuvchi turi, RESTARAUNT yoki USER bo'lishi mumkin, uning turi String va default qiymati USER
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },
// memberStatus - foydalanuvchi holati, ACTIVE, BLOCK yoki DELETE bo'lishi mumkin, uning turi String va default qiymati ACTIVE
    memberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

 // memberNick - foydalanuvchi nomi, String turi va unique bo'lishi kerak,index: { unique: true, sparse: true }
 // unique: true - bu maydonning unikal bo'lishi kerakligini bildiradi
 // sparse: true - bu maydonning bo'sh bo'lishiga ruxsat beradi
 // required: true - bu talab qiladiki, bu maydonni to'ldirish shart
    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },
//memberPhone - foydalanuvchi telefon raqami, String turi va unique bo'lishi kerak,index: { unique: true, sparse: true }
    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },
//memberPassword - foydalanuvchi paroli, String turi va select: false, required: true, bu maydonni ko'rishni yopadi
    memberPassword: {
      type: String,
      select: false,
      required: true,
    },

    memberAddress: {
      type: String,
    },

    memberDesc: {
      type: String,
    },

    memberImage: {
      type: String,
    },

    memberPoints: {
      type: Number,
      default: 0,
    },
    },
    { timestamps: true } // updatedAt, createdAt info
);

export default mongoose.model("Member", memberSchema);
