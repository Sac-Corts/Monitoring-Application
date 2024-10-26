import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
)

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log('Server started...');

        //   todo: Send email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(
        //     ['icortesmorales21@gmail.com', 'isaacgeo125@gmail.com']
        // )

        // emailService.sendEmailWithFileSystemLogs(
        //     ['icortesmorales21@gmail.com', 'isaacgeo125@gmail.com']
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log('logs', logs);

        // CronService.createJob(
        //     '*/10 * * * * *',
        //     () => {
        //         const url = 'http://google.com';
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`Service ${url} is ok`),

        //             (error) => console.error(error)
        //         ).execute(url);
        //     }
        // );
    }
}