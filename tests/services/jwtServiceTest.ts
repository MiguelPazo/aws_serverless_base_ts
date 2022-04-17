/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import {IJwtService} from "../../src/services/interfaces/IJwtService";
import TYPES from "../../src/types";
import {expect} from "chai";
import {AuthUser} from "../../src/dto/authUser";


describe('jwtServiceTest', () => {

    let authToken;
    const jwtService = container.get<IJwtService>(TYPES.IJwtService);

    before(async () => {
        authToken = await jwtService.generateAuthToken(JSON.parse(process.env.TEST_AUTH_TOKEN_PAYLOAD || ''));
    });

    it("generateAuthTokenTest", async () => {
        const token = await jwtService.generateAuthToken({
            firstname: 'Miguel',
            lastname: 'Pazo',
            ip: '127.0.0.1',
            userAgent: 'test'
        });

        expect(token).to.be.a('string');
    });

    it("verifyAuthTokenTest", async () => {
        const result = await jwtService.verifyAuthToken(authToken);

        expect(result).to.own.include({
            firstname: 'Miguel',
            lastname: 'Pazo',
            ip: '127.0.0.1',
            userAgent: 'test'
        });
    });

    it("setRevokedTokenTest", async () => {
        const payload: AuthUser = await jwtService.verifyAuthToken(authToken);
        const result = await jwtService.setRevokedToken(payload);
        console.log(result);

        expect(result).equal(true);
    });

    it("getRevokedTokenTest", async () => {
        const payload: AuthUser = await jwtService.verifyAuthToken(authToken);
        await jwtService.setRevokedToken(payload);

        const result = await jwtService.getRevokedToken(payload.token);

        expect(result).to.not.be.null;
    });

    it("verifyAuthToken with null", async () => {
        const result = await jwtService.verifyAuthToken("");

        expect(result).to.be.null;
    });

    it("verifyAuthToken with string", async () => {
        const result = await jwtService.verifyAuthToken("hello world");

        expect(result).to.be.null;
    });
});
