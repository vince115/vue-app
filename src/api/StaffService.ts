import AxiosInstance from './AxiosInstance';

// 定義 Staff 資料的型別
export interface Staff {
  id: number;
  name: string;
  position: string;
  salary: number;
}

// 獲取所有 Staff 資料
export const getAllStaffAPI = async (): Promise<Staff[]> => {
  const response = await AxiosInstance.get<Staff[]>('/Staff');
  return response.data;
};

// 根據 ID 獲取單一 Staff 資料
export const getStaffByIdAPI = async (id: number): Promise<Staff> => {
  const response = await AxiosInstance.get<Staff>(`/Staff/${id}`);
  return response.data;
};

// 新增 Staff 資料
export const createStaffAPI = async (staff: Omit<Staff, 'id'>): Promise<Staff> => {
  const response = await AxiosInstance.post<Staff>('/Staff', staff);
  return response.data;
};

// 更新 Staff 資料
// export const updateStaffAPI = async (id: number, staff: Partial<Staff>): Promise<Staff> => {
//   const response = await AxiosInstance.put<Staff>(`/Staff/${id}`, staff);
//   if (!response.status || response.status !== 200) {
//     throw new Error(`API failed with status: ${response.status}`);
//   }
//   return response.data;
// };

export const updateStaffAPI = async (id: number, updatedData:any) => {
  try {
    const response = await AxiosInstance.put(`/Staff/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error calling updateStaffAPI:', error);
    throw error; // 將錯誤拋出以便上層處理
  }
};

// 刪除 Staff 資料
export const deleteStaffAPI = async (id: number): Promise<void> => {
  const response = await AxiosInstance.delete(`/Staff/${id}`);
  if (!response.status || response.status !== 200) {
    throw new Error(`Failed to delete staff with id: ${id}`);
  }
};
