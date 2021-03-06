# crispy-happiness
This is a test

# Prerequisites:
I developed this using
* node 14.17
* yarn 1.22.17
* npx 6.14.11
* docker-compose 1.29.0

# Install
```
yarn install
yarn init-project
```

# How to run it
```
docker-compose up -d;
yarn start-dev
```

# Adding clients
We need to add at least one client so that we can calculate transactions.

How to add clients:
```
yarn add-client 42 0.05
```
This will add the client with id 42 and their preferred commission of 0.05 eur.
Run `yarn add-client --help` for usage info. Arguments are optional

# Running tests
```
yarn test
```

# Example Requests
If you use [Insomnia](https://insomnia.rest/) (REST client), you can find a request collection in the insomnia directory. 

# Some thoughts
* I decided to do this from scratch so it's a bit harder to build :)
* In the request example, the "amount" property seems to be a string. I made the validator to ask for a number. 
I hope that's ok. (if there's a solid reason for it to be a string, I'm curious to know).
* I assumed the "amount" property is always positive. Thought about handling negative amount transactions (refunds)
but in the interest of time I didn't :)
* Haven't thought about CI and a production config, sorry
* Maybe not all files are placed in their ideal directory. I'd assume this could get ironed out after working more with this directory structure
* For simplicity, all dates are used as strings :D. Helps with not caring about timezones and the problems that come with dates. Had too keep it simple

# Dev notes

## Migrations
If you plan on changing the typeorm entities, make sure to create a new migration
```
yarn generate-migration YourMigrationName
```
You'll need to restart the dev server for the migrations to be executed or
you could just run 
```
yarn migrate
```

# To do 
* Add linter
* Tests
* Move credentials to .env file instead of config.ts
* Set up tsconfig base paths for config, domains, infrastructure, utils, etc
* Create typeorm logger based on the infrastructure/logger
* Memoize conversion rate api responses based on dates
* Replace string currency types with the Currency enum
* Add tsDoc comments
* Left a lot of TODO comments. It could definitely be improved in many ways, but I hope you get an idea :)
* fix circular references. About 5 left. Related to types not being in separate files