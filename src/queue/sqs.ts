/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as AWS from "aws-sdk";

export const sqs = new AWS.SQS({
    region: process.env.SQS_REGION,
    accessKeyId: process.env.SQS_ACCESS_KEY,
    secretAccessKey: process.env.SQS_SECRET_KEY
});
