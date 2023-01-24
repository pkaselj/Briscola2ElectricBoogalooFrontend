import IErrorDTO from "../../dto/error-dto";
import ILoginRequestDTO from "../../dto/login-request-dto";
import { ErrorCode } from "../../errors/error-list";
import _appsettingsService from "../settings/settings-service";

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
    async LogIn(credentials : ILoginRequestDTO) : Promise<IErrorDTO> {
        const URL = `${_appsettingsService.GetApiUrl()}/login`

        const payload = JSON.stringify(credentials)

        try {
            return fetch(URL, {
                    method: 'POST',
                    mode: 'cors',
                    body: payload,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then( async response => {
                if(!response.ok) {
                    return new CustomError(
                        response.status,
                        response.statusText
                    )
                }
                return await response.json() as IErrorDTO
            })
        } catch (e) {
            return new CustomError(
                ErrorCode.ERROR_HTTP_REQUEST_FAILED,
                `${e}`
            )
        }
    }
}

const _loginService : LoginService = new LoginService();

export default _loginService;