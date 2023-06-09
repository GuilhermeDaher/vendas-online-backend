import LoginPayload from "../auth/dto/loginPayload.dto"

export const authorizationToLoginPayload = (authorization: string): LoginPayload | undefined => {
    const authorizationSplitted = authorization.split('.');

    if(authorization.length < 3 || !authorizationSplitted[1]){
        return undefined;
    } 

    return JSON.parse(Buffer.from(authorizationSplitted[1], 'base64').toString('ascii'))
}