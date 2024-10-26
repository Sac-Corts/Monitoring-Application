import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('LogEntity', () => {

    const dataObj = {
        message: 'This is a test message',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts',
    }

    test('should create a LogEntity instance', () => {
    
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from JSON', () => {

        const json = `{"message":"Service http://google.com is working","level":"low","origin":"check-service.ts","createdAt":"2024-10-25T08:27:00.254Z"}`;
        
        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service http://google.com is working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from Object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });
});