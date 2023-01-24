import express, {Express, Request, Response} from "express";
import ILoginRequestDTO from "../dto/request/ILoginRequestDTO";
import IErrorDTO from "../dto/response/IErrorDTO";
import ILoginResponseDTO from "../dto/response/ILoginResponseDTO";
import GetError, { ErrorCodes } from "../error/error-list";



export const loginAction = (req : Request, res : Response) => {
    
    const credentials : ILoginRequestDTO | undefined = req.body as ILoginRequestDTO
  
    // Require that request body is json object implementing interface ILoginRequestDTO
    if (!credentials) {
        res.sendStatus(400)
    }
  
    // On correct username send bearer token
    if (credentials.username == 'admin' && credentials.password == 'Admin1234') {
        const responseBody : ILoginResponseDTO = {
            token: 'Bearer 123SampleToken123'
        } 

        // Successful login is denoted by:
        // StatusCode 200
        // Payload JSON ILoginResponseDTO
        res.status(200).json(responseBody)
    } else {
        // Invalid login credentials are denoted by:
        // StatusCode 400
        // Payload IErrorDTO
        const error = GetError(ErrorCodes.INVALID_LOGIN_CREDENTIALS)
        res.status(400).json(error)
    }
}
