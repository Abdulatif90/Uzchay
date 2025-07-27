
export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500, 
}

export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong!",
  NO_DATA_FOUND = "No data found!",
  CREATE_FAILED = "Create is failed!",
  UPDATE_FAILED = "Update is failed!",
  USED_NICK_PHONE = "You are iserting already used nick or phone!",
  BLOCKED_USER = " You have been blocked, contact restaurant!",
  NO_MEMBER_NICK = "No memeber with that member nick!",
  WRONG_PASSWORD = "Wrong password, please try again",
  NO_MEMBER_FOUND= "No member found!",
  UNAUTHORIZED_ACCESS = "Unauthorized access!",
  TOKEN_CREATION_FAILED = "Token creation error!",
  MEMBER_NOT_FOUND = "Member not found!",
  MEMBER_ALREADY_EXISTS = "Member already exists!",
  MEMBER_DELETED = "Member has been deleted!",
  MEMBER_UPDATED = "Member has been updated successfully!",
  MEMBER_SIGNUP_SUCCESS = "Member signed up successfully!",
  MEMBER_LOGIN_SUCCESS = "Member logged in successfully!",
  MEMBER_LOGOUT_SUCCESS = "Member logged out successfully!",
  MEMBER_SESSION_SAVED = "Member session saved successfully!",      
    
}

class Errors extends Error {
  public code: HttpCode;
  public message: Message;
  
  static standart = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG,
  }
  

  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    this.code = statusCode;
    this.message = statusMessage;
  }
}

export default Errors;
