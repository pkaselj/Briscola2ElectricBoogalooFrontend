import IErrorDTO from "../dto/response/IErrorDTO";

export enum ErrorCodes {
    GENERAL_FAILURE = -1,
    INVALID_LOGIN_CREDENTIALS = 0
};


const _errorDatabase : {[key in ErrorCodes] : IErrorDTO} = {
    [ErrorCodes.GENERAL_FAILURE] : {
        errorCode : ErrorCodes.GENERAL_FAILURE,
        errorMessage : 'General failure. Unknown error.'
    },

    [ErrorCodes.INVALID_LOGIN_CREDENTIALS]: {
        errorCode: ErrorCodes.INVALID_LOGIN_CREDENTIALS,
        errorMessage: 'Invalid login credentials.'
    },
}

export default function GetError(errorCode: ErrorCodes): IErrorDTO {
    return _errorDatabase[errorCode] ?? _errorDatabase[ErrorCodes.GENERAL_FAILURE];
}