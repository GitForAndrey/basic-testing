import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: any) => fn, 
}));

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
let mockAxiosInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockAxiosInstance = {
      get: jest.fn(),
    };
    
    mockAxios.create.mockReturnValue(mockAxiosInstance);
  });

  test('should create instance with provided base url', async () => {
    const mockData = { id: 1, title: 'Test Post' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockData });

    await throttledGetDataFromApi('/posts/1');

    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockData = { id: 1, title: 'Test Post' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockData });
    
    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Test Post', body: 'Test content' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
