/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import {IJwtService} from "../../src/services/interfaces/IJwtService";
import TYPES from "../../src/types";
import {expect} from "chai";
import {ISqsService} from "../../src/services/interfaces/ISqsService";


describe('sqsServiceTest', () => {

    let authToken;
    const sqsService = container.get<ISqsService>(TYPES.ISqsService);
    const jwtService = container.get<IJwtService>(TYPES.IJwtService);

    before(async () => {
        authToken = await jwtService.generateAuthToken(JSON.parse(process.env.TEST_AUTH_TOKEN_PAYLOAD || ''));
    });

    it("sendTest", async () => {
        expect(true).equal(true);
    });
});
