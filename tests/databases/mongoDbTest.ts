/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {IMongoDb} from "../../src/databases/_interfaces";
import {expect} from "chai";


describe('mongoDbTest', () => {

    const mongoDb = container.get<IMongoDb>(TYPES.IMongoDb);
    const time = new Date().getTime();

    before(async () => {
        const writer = await mongoDb.getWriter();
        writer.collection('test').insertOne({foo: 'bar', time: time});
    });

    after(async () => {
        const writer = await mongoDb.getWriter();
        writer.collection('test').deleteMany({time: time});
    });

    it("getReaderTest", async () => {
        const reader = await mongoDb.getReader();
        const result = await reader.collection('test').findOne({time: time});

        expect(result).to.own.include({foo: 'bar', time: time});
    });

    it("getWriterTest", async () => {
        const writer = await mongoDb.getWriter();
        const result = await writer.collection('test').insertOne({foo: 'bar2', time: time});

        expect(result).to.include.all.keys('acknowledged', 'insertedId');
    });
});
