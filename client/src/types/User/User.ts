export interface IRegisterRequest{
    username: string;
    email: string;
    password: string;
} 

export interface IRegisterSuccessResponse {
    message: string | any;
} 

export interface IRegisterFailureResponse{
    message: string;
}

export interface ILoginRequest{
    usernameOrEmail: string;
    password: string;
} 

export interface ILoginSuccessResponse {
    accessToken: string;
}

export interface ILoginFailureResponse{
    message: string;
}
