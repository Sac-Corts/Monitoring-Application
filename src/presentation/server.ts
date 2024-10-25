import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
)
const emailService = new EmailService();


export class Server {

    public static start() {
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

        // CronService.createJob(
        //     '*/2 * * * * *',
        //     () => {
        //         const url = 'http://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`Service ${url} is ok`),

        //             (error) => console.error(error)
        //         ).execute(url);

        //         // new CheckService().execute('http://localhost:3000');
        //     }
        // );
    }
}