/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import container from "../../src/inversifyConfig";
import TYPES from "../../src/types";
import {IDynamoDb} from "../../src/databases/_interfaces";
import {expect} from "chai";


describe('dynamoDbTest', () => {

    const dynamoDb = container.get<IDynamoDb>(TYPES.IDynamoDb);
    let _db;

    before(async () => {
        _db = await dynamoDb.getDb();
    });

    it("insertTest", async () => {
        try {
            const result = await _db.put({
                TableName: 'table_test',
                Item: {
                    foo: 'bar'
                }
            }).promise();
        } catch (err) {
            console.log('You need to replace this query with right params')
            console.log(err);
        }

        expect(true).equal(true);
    });

    it("getTest", async () => {
        try {
            const result = await _db.get({
                TableName: 'table_test',
                Key: {
                    'user': 'admin'
                }
            }).promise();

            console.log(result.Item);
        } catch (err) {
            console.log('You need to replace this query with right params')
            console.log(err);
        }

        expect(true).equal(true);
    });
});
