# SLS TS base project

A nice project with begin with SLS + Typescript + Inversify

---

## Requirements

For development, you will need Node.js and install package.json dependencies.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer. Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.18.1

    $ npm --version
    8.1.3

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Serverless

You need to install [serverless](https://www.serverless.com/framework/docs) globally

    $ npm install -g serverless

###

---

## Install

    $ git clone https://github.com/MiguelPazo/aws_serverless_base_ts
    $ cd aws_serverless_base_ts
    $ npm install

## Configure app

For development purpose copy `env/params-local.yml.sample` as `env/params-local.yml` then edit it with your settings.

For unit testing purpose copy `.mocharc.js.sample` as `.mocharc.js` then edit it with your settings.

## Running project

    $ npm run dev

## Running unit testing

    $ npm run test

## Deploy in AWS

### 1. Configure serverless
You need to configure credentials to deploy on AWS, for this case you can configure AWS profile, review this [guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#use-an-existing-aws-profile)

### 2. Config params
Copy file `env/params-local.yml.sample` as `env/params-{environment}.yml` according needed environment, I recommend this possible values: dev, qa, production.

### 3. Deploy
According your environment configured, run these command

    $ sls deploy -s {environment}

Example for dev environment:

    $ cp env/params-local.yml.sample env/params-dev.yml
    $ sls deploy -s dev
  

##

---

## Notes

If you want to use this project directly, you need to change next configurations:

- Project `name` in package.json
- Name `service` in serverless.yml

Maybe you need to review next projects to understand it:

- https://www.npmjs.com/package/ts-lambda-api
- https://www.npmjs.com/package/tslog
- https://www.npmjs.com/package/mocha
- https://www.npmjs.com/package/nyc
