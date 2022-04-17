/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as request from "supertest";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {IJwtService} from "../../src/services/interfaces/IJwtService";


describe("userControllerTest", () => {
    const server = request(process.env.BASE_URL);

    let authToken;
    const jwtService = container.get<IJwtService>(TYPES.IJwtService);

    before(async () => {
        authToken = await jwtService.generateAuthToken(JSON.parse(process.env.TEST_AUTH_TOKEN_PAYLOAD || ''));
    });

    it("GET /user", (done) => {
        server.get('/user')
            .set('Authorization', `Bearer ${authToken}`)
            .set('User-Agent', 'testing with supertest')
            .expect(200)
            .end((error, result) => {
                if (error) {
                    console.log(error.message);
                    return done(error);
                }

                console.log(result.body);

                return done();
            });
    });
});
