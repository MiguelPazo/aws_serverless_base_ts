/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {expect} from "chai";
import {IUtils} from "../../src/common/_interfaces";


describe('utilsTest', () => {

    const utils = container.get<IUtils>(TYPES.IUtils);

    it("validateEmailTest", async () => {
        const email = 'miguel.ps19@gmail.com';
        const result = utils.validateEmail(email);

        expect(result).equal(true);
    });

    it("hashPasswordWithSaltTest", async () => {
        const password = 'admin123';
        const result = await utils.hashPasswordWithSalt(password);

        console.log(result);

        expect(result).to.be.a('string');
    });
});
