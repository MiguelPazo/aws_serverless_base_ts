/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {Principal} from "ts-lambda-api";

export class AuthUser extends Principal {

    private roles: string[] = [];

    public iss: string;
    public aud: string;
    public jti: string;
    public exp: number;
    public user: string;
    public firstname: string;
    public lastname: string;
    public ip: string;
    public userAgent: string;
    public token: string;

    public constructor(name: string) {
        super(name)
    }
}
