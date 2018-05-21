export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  status: boolean;
  token: string;
}
