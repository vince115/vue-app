import AxiosInstance from './AxiosInstance';

// 定義 Staff 資料的型別
export interface Staff {
    id: number;
    name: string;
    position: string;
    salary: number;
  }

// 獲取所有 Staff 資料
export const getAllStaff = async (): Promise<Staff[]> => {
    const response = await AxiosInstance.get<Staff[]>('/Staff');
    return response.data;
};

// export const getAllStaff = async () => {
//     const response = await AxiosInstance.get('/Staff');
//     return response.data;
//   };

// 獲取單個 Staff 資料
// export const getStaffById = async (id: any) => {
//   const response = await AxiosInstance.get(`/Staff/${id}`);
//   return response.data;
// };

export const getStaffById = async (id: number): Promise<Staff> => {
    const response = await AxiosInstance.get<Staff>(`/Staff/${id}`);
    return response.data;
  };
  

// 新增 Staff 資料
// export const createStaff = async (staff: any) => {
//   const response = await AxiosInstance.post('/Staff', staff);
//   return response.data;
// };
export const createStaff = async (staff: Omit<Staff, 'id'>): Promise<Staff> => {
    const response = await AxiosInstance.post<Staff>('/Staff', staff);
    return response.data;
  };

// 更新 Staff 資料
// export const updateStaff = async (id: any, staff: any) => {
//   const response = await AxiosInstance.put(`/Staff/${id}`, staff);
//   return response.data;
// };
export const updateStaff = async (id: number, staff: Partial<Staff>): Promise<Staff> => {
    const response = await AxiosInstance.put<Staff>(`/Staff/${id}`, staff);
    return response.data;
  };

// 刪除 Staff 資料
// export const deleteStaff = async (id: any) => {
//   const response = await AxiosInstance.delete(`/Staff/${id}`);
//   return response.data;
// };
export const deleteStaff = async (id: number): Promise<void> => {
    await AxiosInstance.delete(`/Staff/${id}`);
  };
