/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {IRedisDb} from "../../src/databases/_interfaces";
import {expect} from "chai";


describe('redisDbTest', () => {

    const redisDb = container.get<IRedisDb>(TYPES.IRedisDb);

    it("getReaderTest", async () => {
        const reader = await redisDb.getReader();
        const result = await reader.call('PING');

        expect(result).equal('PONG');
    });

    it("getWriterTest", async () => {
        const writer = await redisDb.getWriter();
        const result = await writer.call('PING');

        expect(result).equal('PONG');
    });
});
