/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {injectable} from "inversify";
import {IUtils} from "./_interfaces";
import {v4 as uuidv4} from 'uuid';
import * as crypto from "crypto";
import {Constants} from "./constants";
import * as randomstring from "randomstring";
import * as bcrypt from 'bcrypt';


@injectable()
export class Utils implements IUtils {

    validateEmail(email: string): boolean {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return regexp.test(String(email).toLowerCase());
    }

    isEmpty(text: string): boolean {
        if (!text) {
            return true;
        }

        return (!text.trim() || /^\s*$/.test(text.trim()));
    }

    isNumeric(text: any): boolean {
        return /^[0-9]+$/.test(text);
    }

    isBoolean(val: any): boolean {
        return Boolean(val) === val;
    }

    validPhone(value): boolean {
        let regexp = new RegExp(/^9[\d]{8}$/);

        return regexp.test(value);
    }

    validPasswordStructure(value): boolean {
        let regexp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/);

        return regexp.test(value);
    }

    generateCode(value?: string): string {
        let uuid = uuidv4();

        if (value && !this.isEmpty(value)) {
            uuid = uuid + value;
        }

        return crypto.createHash('sha256').update(uuid).digest('hex');
    }

    generateToken(size): string {
        return randomstring.generate({
            length: size,
            charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        });
    }

    generatePassword(size): string {
        let result: string = "";
        let valid = false;

        while (!valid) {
            result = this.generateToken(size);

            if (this.validPasswordStructure(result)) {
                valid = true;
            }
        }

        return result;
    }

    diacriticSensitiveRegex(value: string = ''): string {
        return value.replace(/a/g, '[a,á,à,ä]')
            .replace(/e/g, '[e,é,ë]')
            .replace(/i/g, '[i,í,ï]')
            .replace(/o/g, '[o,ó,ö,ò]')
            .replace(/u/g, '[u,ü,ú,ù]');
    }

    hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    async hashPasswordWithSalt(password: string): Promise<any> {
        return await bcrypt.hashSync(password, Constants.SALT_ROUNDS);
    }

    async comparePasswordWithSalt(password: string, hash: string): Promise<any> {
        return await bcrypt.compareSync(password, hash);
    }
}

