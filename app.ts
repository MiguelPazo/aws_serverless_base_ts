/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import 'reflect-metadata';
import * as path from "path";
import {ApiLambdaApp, ApiRequest, AppConfig} from "ts-lambda-api";
import {makeLoggerMiddleware} from 'inversify-logger-middleware';
import container from "./src/inversifyConfig";
import {AuthFilter} from "./src/filters/authFilter";

const appConfig = new AppConfig()
// @ts-ignore
appConfig.openApi.enabled = true
// @ts-ignore
appConfig.openApi.useAuthentication = true

// @ts-ignore
if (process.env.APP_ENV === 'local') {
    const logger = makeLoggerMiddleware();
    container.applyMiddleware(logger);
}

const controllersPath = [path.join(__dirname, "src/controllers")]
const app = new ApiLambdaApp(controllersPath, appConfig, container)

const authFilter = new AuthFilter();
app.middlewareRegistry.addAuthFilter(authFilter);

app.configureApi(api => {
        // api.use( helmet);

        api.use('/*', (req, res, next) => {
            res.cors({});
            next();
        });

        api.options('/*', (req, res, next) => {
            return res.status(200).json({})
        });
    }
)

export async function handler(event: ApiRequest, context: any) {
    return await app.run(event, context)
}
