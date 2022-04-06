import {AppDataSource} from "../infrastructure/db/cli-data-source";
import {Client} from "../domains";
import { Logger } from "../infrastructure";
import * as Yup from "yup";

async function run() {
    const logger = new Logger({ debugEnabled: true, displayFilePath: false, displayDateTime: false });

    if (!process.argv[2] || process.argv[2] === '--help') {
        logger.info(`usage:
yarn add-client client-id [comission-percent]
client-id          integer or "a" to assign an id automatically
comission-percent  float meaning the preferred commission for this client or "a" to not have a preferred commission
`)
        process.exit(0);
    }

    const schema = Yup.object().shape({
        id: Yup.number().integer().moreThan(0),
        comissionPercent: Yup.number().moreThan(0).max(100),
    });

    console.log(process.argv);

    const inputId = process.argv[2] === 'a' ? undefined : process.argv[2];
    const inputCommissionPercent = process.argv[3] === 'a' ? undefined : process.argv[3];

    try {
        const { id, commissionPercent } = await schema.validate({
            id: inputId,
            commissionPercent: inputCommissionPercent
        });

        const connection = await AppDataSource.initialize();
        const result = await connection.createQueryBuilder().insert()
            .into(Client)
            .values([
                { id, commissionPercent }
            ])
            .execute();

        logger.info(`Client '${result.raw.id}' was added with preferred commission '${result.raw.commissionPercent}'`);

        // Ideally, i would have inserted it like this, but TypeORM doesn't let me set the id manually
        // const client = new Client();
        // if (id) {
        //     client.id = id;
        // }
        // client.commissionPercent = commissionPercent;
        //
        // const result = await AppDataSource.getRepository(Client).save(client);
        //
        // logger.info(`Client '${result.id}' was added with preferred commission '${result.commissionPercent}'`);

    } catch (e) {
        logger.error(e);
        process.exit(1);
    }


}

void run();
