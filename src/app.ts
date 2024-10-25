import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message from Prisma',
    //         origin: 'App.ts',
    //     }
    // });

    // const logs = await prisma.logModel.findMany();
    // console.log('logs', logs);

    // Create a collection
    // const newLog = await LogModel.create({
    //     level: 'low',
    //     message: 'Test message from Mongo',
    //     origin: 'App.ts',
    // });

    // await newLog.save();
    // console.log('newLog', newLog);

    
    Server.start();
}