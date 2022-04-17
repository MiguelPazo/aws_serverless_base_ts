/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {IAuthService} from "../../src/services/interfaces/IAuthService";
import {expect} from "chai";


describe('authServiceTest', () => {

    const authService = container.get<IAuthService>(TYPES.IAuthService);

    it("validateTest", async () => {
        const result = await authService.validate(
            "miguel.ps19@gmail.com",
            "admin123",
            "127.0.0.1",
            "test",
        );

        expect(result).to.be.a('string');
    });
});
