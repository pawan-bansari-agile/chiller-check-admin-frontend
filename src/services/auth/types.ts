export interface ISignInReq {
  email: string;
  password: string;
  deviceId: string;
  fcmToken: string;
  deviceType: string;
}

export interface ISignInRes {
  userId?: string;
  message?: string;
  otpSent?: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accessToken: string;
  role: string;
  deviceId: string;
  profileImage?: string;
  deviceType: string;
  permissions?: any;
  blockLogin?: boolean;
  companyId?: string;
}

export interface IVerifyOtpReq {
  otp: string;
  userId: string;
  deviceId: string;
  fcmToken: string;
  deviceType: string;
}

export interface IForgotPasswordRes {
  resetPasswordToken: string;
  _id: string;
  emailTemplate?: {
    html: string;
  };
}
