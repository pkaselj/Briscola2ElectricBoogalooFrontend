import IErrorDTO from "../../dto/error-dto";
import ILoginRequestDTO from "../../dto/login-request-dto";
import ILoginResponseDTO from "../../dto/login-response";
import { ErrorCode } from "../../errors/error-list";
import _appsettingsService from "../settings/settings-service";

import axios, { AxiosError } from "axios";

class CustomError implements IErrorDTO {

    constructor(code : number, message : string, data? : any) {
        this.errorCode = code
        this.errorMessage = message
        this.errorData = data
    }

    errorCode: number;
    errorMessage: string;
    errorData?: any;
    
}

class LoginService {
    async LogIn(credentials : ILoginRequestDTO) : Promise<ILoginResponseDTO> {
        const URL = `${_appsettingsService.GetApiUrl()}/api/login`
        
        return axios.post<ILoginRequestDTO, ILoginResponseDTO>(
            URL,
            JSON.stringify(credentials),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .catch(
                (e : AxiosError) => {
                    const errorMsg = (e.response?.data as IErrorDTO).errorMessage ?? 'Unknown Error'

                    throw new CustomError(
                        ErrorCode.ERROR_HTTP_REQUEST_FAILED,
                        `${errorMsg}`
                )}
            )
    }
}

const _loginService : LoginService = new LoginService();

export default _loginService;