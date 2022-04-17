/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as request from "supertest";
import {expect} from "chai";


describe("authControllerTest", () => {
    const server = request(process.env.BASE_URL);

    it("POST /auth", (done) => {
        const data = {
            user: 'miguel.ps19@gmail.com',
            password: 'admin123',
        }

        server.post('/auth')
            .set('Accept', 'application/json')
            .set('User-Agent', 'testing with supertest')
            .send(data)
            .end((error, result) => {
                if (error) {
                    console.log(error.message);
                    return done(error);
                }

                console.log(result.body);
                expect(result.body).to.own.include({success: true});

                return done();
            });
    });
});
