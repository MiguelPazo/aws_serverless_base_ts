/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {IUserService} from "../../src/services/interfaces/IUserService";
import {expect} from "chai";
import {IJwtService} from "../../src/services/interfaces/IJwtService";


describe('userServiceTest', () => {

    let authToken;
    const userService = container.get<IUserService>(TYPES.IUserService);
    const jwtService = container.get<IJwtService>(TYPES.IJwtService);

    before(async () => {
        authToken = await jwtService.generateAuthToken(JSON.parse(process.env.TEST_AUTH_TOKEN_PAYLOAD || ''));
    });

    it("getOneTest", async () => {
        const result = await userService.getOne("miguel.ps19@gmail.com");

        expect(result).to.own.include({user: 'miguel.ps19@gmail.com'});
    });
});
