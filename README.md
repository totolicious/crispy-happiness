# crispy-happiness
This is a test

#Prerequisites:
I developed this using
node 14.16
yarn 1.22.17
npx 6.14.11
docker-compose 1.29.0

#Install:
```
yarn install
yarn init-project
```

#How to run it:
```
docker-compose up -d;
yarn start-dev
```

#Adding clients
Run the server at least once before beginning this section.
I don't have an admin GUI for you, but you could connect to the db (see docker-compose.yml for credentials) and add a client.
Or you could just type
```
yarn add-client 42 0.05
```
This will add the client with id 42 and their preferred commission of 0.05%
Run `yarn add-client --help` for usage info. Arguments are optional

#Some thoughts:
* I decided to do this from scratch so it's a bit harder to build :)
* In the request example, the "amount" property seems to be a string. I made the validator to ask for a number. 
I hope that's ok. (if there's a solid reason for it to be a string, I'm curious to know).
* I assumed the "amount" property is always positive. Thought about handling negative amount transactions (refunds)
but in the interest of time I didn't :)
* Haven't thought about CI and a production config, sorry
* Maybe not all files are placed in their ideal directory. I'd assume this could get ironed out after working more with this directory structure
* For simplicity, all dates are used as strings :D. Helps with not caring about timezones and the problems that come with dates. Had too keep it simple

#Dev notes:

##Migrations:
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