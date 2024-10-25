import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prismaClient.logModel.create({
            data: {
                level: severityEnum[log.level],
                message: log.message,
                origin: log.origin,
            }
        });

        console.log('newLog', newLog);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                level: severityEnum[severityLevel],
            }
        });

        return dbLogs.map( LogEntity.fromObject); 
    }
}