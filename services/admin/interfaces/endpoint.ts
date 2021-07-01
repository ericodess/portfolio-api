export interface IGeneralResponse {
    success: boolean,
    description?: string
};

export interface IAuthResponse {
    success: boolean,
    isUserAuthenticated: boolean
};