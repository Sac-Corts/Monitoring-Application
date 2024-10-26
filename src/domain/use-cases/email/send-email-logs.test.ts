import { SendEmailLogs } from './send-email-logs';
import { EmailService } from '../../../presentation/email/email.service';
import { LogRepository } from '../../repository/log.repository';
import { LogSeverityLevel } from '../../entities/log.entity';

describe('SendEmailLogs', () => {
    let sendEmailLogs: SendEmailLogs;
    let emailService: jest.Mocked<EmailService>;
    let logRepository: jest.Mocked<LogRepository>;

    beforeEach(() => {
        emailService = {
            sendEmailWithFileSystemLogs: jest.fn(),
        } as unknown as jest.Mocked<EmailService>;

        logRepository = {
            saveLog: jest.fn(),
        } as unknown as jest.Mocked<LogRepository>;

        sendEmailLogs = new SendEmailLogs(emailService, logRepository);
    });

    it('should save a log when email is sent successfully', async () => {
        emailService.sendEmailWithFileSystemLogs.mockResolvedValue(true);

        const result = await sendEmailLogs.execute('test@example.com');

        expect(result).toBe(true);
        expect(logRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Log email sent',
            level: LogSeverityLevel.low,
            origin: 'send-email-logs.ts',
        }));
    });

    it('should save a log when email sending fails', async () => {
        emailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('test@example.com');

        expect(result).toBe(false);
        expect(logRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error: Email log not sent',
            level: LogSeverityLevel.high,
            origin: 'send-email-logs.ts',
        }));
    });
});