import axios from 'axios';

// 建立 Axios 實例
const AxiosInstance = axios.create({
  baseURL: 'https://localhost:7256/api', // 後端 API 的 Base URL
  timeout: 5000, // 請求超時時間
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosInstance;
