import ViewModel from "../schema/View.model"; 
import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";

class ViewService {
  private readonly viewModel;
  
  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistence(input: ViewInput): Promise<View> {
    const result = await this.viewModel
      .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
      .exec();
    if (!result) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }
    return result.toObject() as View;
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      const doc = await this.viewModel.create(input);
      return doc.toObject() as View;
    } catch (error) {
      console.log("Error model:insertMemberView", error);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

}

export default ViewService;