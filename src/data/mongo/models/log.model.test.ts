import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";


describe('Log Model.test.ts', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });


    test('should return a LogModel', async () => {

        const logData = {
            level: 'low',
            message: 'test-message',
            origin: 'log.model.test.ts',
        }

        const log = await LogModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }));

        await LogModel.findByIdAndDelete({ _id: log.id });
    });

    test('should return the schema object', () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining(
            {
                level: {
                    type: String,
                    enum: ['low', 'medium', 'high'],
                    default: 'low'
                },
                message: { type: String, required: true },
                origin: { type: String, required: true },
                createdAt: { type: Date, default: expect.any(Date) }
            }
        ));
    });
});