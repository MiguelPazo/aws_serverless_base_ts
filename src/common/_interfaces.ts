/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {Logger as libLog} from "tslog";

export interface IUtils {

    validateEmail(email: string): boolean;

    isEmpty(text: string): boolean;

    isNumeric(text: any): boolean;

    isBoolean(val: any): boolean;

    validPhone(value): boolean;

    validPasswordStructure(value): boolean;

    generateCode(value?: string): string;

    generateToken(size: number): string;

    generatePassword(size: number): string;

    diacriticSensitiveRegex(value: string): string;

    hashPassword(password: string): string;

    hashPasswordWithSalt(password: string): Promise<any>;

    comparePasswordWithSalt(password: string, hash: string): Promise<any>
}

export interface ILogger {

    getLogger(): libLog;
}
