 import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
 import { existsSync } from 'fs';
 import { readFile } from 'fs/promises';
 import { join } from 'path';

 jest.mock('fs');
 jest.mock('fs/promises');
 jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(mockCallback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(mockCallback, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
   const mockCallback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(mockCallback, timeout);

    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(999);
    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
   
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const interval = 1000;

    doStuffByInterval(mockCallback, interval);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(mockCallback, interval);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const interval = 1000;


    doStuffByInterval(mockCallback, interval);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
   const mockPath = 'test.txt';
    const mockFullPath = '/full/path/test.txt';
    
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('test content'));

    await readFileAsynchronously(mockPath);

    expect(join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    const mockPath = 'nonexistent.txt';
    const mockFullPath = '/full/path/nonexistent.txt';
    
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBeNull();
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
   const mockPath = 'existing.txt';
    const mockFullPath = '/full/path/existing.txt';
    const mockContent = 'Hello, World!';
    
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockContent));

    const result = await readFileAsynchronously(mockPath);

    expect(readFile).toHaveBeenCalledWith(mockFullPath);
    expect(result).toBe(mockContent);
  });
});
