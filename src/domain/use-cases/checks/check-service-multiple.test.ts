import { mock } from "node:test";
import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('CheckServiceMultipleUseCase', () => {

    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    
    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3],
        successCallback,
        errorCallback,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })



    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkServiceMultiple.execute('https://www.google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));        
    });

    test('should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkServiceMultiple.execute('https://www.gfsffadsfadsoogle.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
});