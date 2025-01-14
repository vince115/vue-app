import type { AxiosResponse } from 'axios';
import axios from 'axios';

// 建立 Axios 實例
const AxiosInstance = axios.create({
  baseURL: 'https://localhost:7256/api', // 後端 API 的 Base URL
  timeout: 5000, // 請求超時時間
  headers: {
    'Content-Type': 'application/json',
  },
});

// 定義 Staff 資料的型別
export interface Staff {
    id: number;
    name: string;
    position: string;
    salary: number;
  }

// 調用具體 API 時補充 `/staff`
// export const getAllStaff = async () => {
//     const response = await AxiosInstance.get('/staff');
//     return response.data;
//   };

  // 調用具體 API 時補充 `/staff`
export const getAllStaff = async (): Promise<Staff[]> => {
    try {
      const response: AxiosResponse<Staff[]> = await AxiosInstance.get('/staff');
      return response.data;
    } catch (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }
  };
  

export default AxiosInstance;
