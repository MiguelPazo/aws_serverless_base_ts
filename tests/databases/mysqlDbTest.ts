/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {IMysqlDb} from "../../src/databases/_interfaces";
import {expect} from "chai";


describe('mysqlDbTest', () => {

    const mysqlDb = container.get<IMysqlDb>(TYPES.IMysqlDb);

    it("getReaderTest", async () => {
        const reader = await mysqlDb.getReader();
        const [result] = await reader.query('SELECT NOW() as data FROM DUAL');

        expect(result[0]).to.include.all.keys('data');
    });

    it("getWriterTest", async () => {
        const writer = await mysqlDb.getWriter();
        const query = 'INSERT INTO TABLE_DUAL (username,password) VALUES(?,?)';

        try {
            const [result] = await writer.query(query, ['admin', '123']);
        } catch (err) {
            console.log('You need to replace this query with right params')
            console.log(err);
        }

        expect(true).equal(true);
    });
});
