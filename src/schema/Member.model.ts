import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/members.enum";

// Build type: Schema First vs Code First
const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },

    memberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

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
