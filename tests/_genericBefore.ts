/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {exportJWK, exportPKCS8, exportSPKI, generateKeyPair} from "jose";


const fs = require('fs');

(async () => {
    const {publicKey, privateKey} = await generateKeyPair('PS256', {modulusLength: 4096});
    const jwkPublic = await exportJWK(publicKey);
    const jwkPrivate = await exportJWK(privateKey);

    const pemPublic = await exportSPKI(publicKey);
    const pemPrivate = await exportPKCS8(privateKey);

    fs.writeFileSync(__dirname + './../storage/keys/public_key.json', JSON.stringify(jwkPublic));
    fs.writeFileSync(__dirname + './../storage/keys/private_key.json', JSON.stringify(jwkPrivate));

    fs.writeFileSync(__dirname + './../storage/keys/public_key.pem', pemPublic);
    fs.writeFileSync(__dirname + './../storage/keys/private_key.pem', pemPrivate);


    process.env.TEST_AUTH_TOKEN_PAYLOAD = JSON.stringify({
        firstname: 'Miguel',
        lastname: 'Pazo',
        ip: '127.0.0.1',
        userAgent: 'test'
    });
})()
