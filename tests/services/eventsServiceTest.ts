/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import {IJwtService} from "../../src/services/interfaces/IJwtService";
import TYPES from "../../src/types";
import {expect} from "chai";
import {IEventsService} from "../../src/services/interfaces/IEventsService";
import {v4 as uuidv4} from 'uuid';


describe('eventsServiceTest', () => {

    let authToken, code;
    const eventsService = container.get<IEventsService>(TYPES.IEventsService);
    const jwtService = container.get<IJwtService>(TYPES.IJwtService);

    before(async () => {
        code = uuidv4();
        authToken = await jwtService.generateAuthToken(JSON.parse(process.env.TEST_AUTH_TOKEN_PAYLOAD || ''));
    });

    it("createTest", async () => {
        const message = "Hello world " + new Date().getTime();
        const result = await eventsService.save(message, code);

        expect(result).equal(true);
    });

    it("fetchAllTest", async () => {
        const result = await eventsService.fetchAll('99a5ffcd-be2f-4c5f-902e-da6e3f977729', 1640150655834);

        console.log(result);
        expect(true).equal(true);
    });
});
