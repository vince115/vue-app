<template>
  <v-app>
    <v-main>
      <v-container>
        <div>
          <h1>Staff List</h1>
          <!-- 新增員工按鈕 -->
          <v-btn color="green" @click="openCreateModal">Create New Staff</v-btn>
        </div>

         <!-- 使用 Vuetify 的 v-data-table -->
         <v-data-table :headers="headers" :items="staffList" item-value="id" class="elevation-1">
         <!-- 自定義表頭插槽 -->
         <template v-slot:thead>
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.text"
                  :style="headerStyle"
                  class="bg-primary border-white"
                >
                  {{ header.text }}
                </th>
              </tr>
            </thead>
          </template>
         <!-- 自定義操作按鈕插槽 -->
         <template v-slot:[`item.actions`]="{ item }">
                      <v-btn color="blue" @click="viewStaff(item.id)">View</v-btn>
                      <v-btn color="yellow" @click="openEditModal(item)">Edit</v-btn>
                      <v-btn color="red" 
                      @click="openDeleteModal(item)">Delete</v-btn>
                      <!-- :disabled="!selectedStaff" -->
         </template>
        </v-data-table>
        
        <!-- 引入 CreateStaff 組件 -->
        <CreateStaff
          v-model="isCreateDialogOpen"
          @create="addStaff"
        />
        <!-- 引入 EditStaff 組件 -->
        <EditStaff 
          v-model="isEditDialogOpen" 
          :editStaff="selectedStaff || undefined"
          @save="updateStaff" />

        <!-- 引入刪除確認 視窗-->
        <ConfirmDelete
          v-model="isDeleteDialogOpen"
          :staffName="selectedStaff?.name || ''"
          @delete="deleteStaff"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllStaffAPI, getStaffByIdAPI, createStaffAPI, updateStaffAPI, deleteStaffAPI } from '../api/StaffService';
import CreateStaff from './CreateStaff.vue';
import EditStaff from './EditStaff.vue';
import ConfirmDelete from './ConfirmDelete.vue';
import { CSSProperties } from 'vue';
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';

const router = useRouter();

// 定義 Staff 接口
interface Staff {
  id: number;
  name: string;
  position: string;
  salary: number;
}

// 表頭
const headers = ref([
  { text: 'Id', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Position', value: 'position' },
  { text: 'Salary', value: 'salary' },
  { text: 'Actions', value: 'actions', sortable: false },
]);

// 反應性數據
const staffList = ref<Staff[]>([]);

// 獲取員工列表
const fetchStaffList = async () => {
  try {
    staffList.value = await getAllStaffAPI(); // 直接更新數據
  } catch (error) {
    console.error('Error fetching staff list:', error);
  }
};

staffList.value = [...staffList.value]; // 強制刷新數據

// 組件掛載時調用
onMounted(fetchStaffList);

// 控制彈窗顯示與數據
const isCreateDialogOpen = ref(false);
const isEditDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
// const selectedStaff = ref<Record<string, any> | undefined>(undefined);
const selectedStaff = ref<Staff | null>(null);

// 打開彈窗
const openCreateModal = () => {
  isCreateDialogOpen.value = true;
};
const openEditModal = (item: any) => {
  selectedStaff.value = { ...item }; // 初始化選擇的員工數據
  isEditDialogOpen.value = true;
};
const openDeleteModal = (item: any) => {
  selectedStaff.value = item; // 设置选中的员工
  isDeleteDialogOpen.value = true; // 打开弹窗
};

// 新增員工
const addStaff = async (newStaff: Omit<Staff, 'id'>) => {
  try {
    const createdStaff = await createStaffAPI(newStaff);
    // 確保新增後只加入唯一的 ID
    if (!staffList.value.some((staff) => staff.id === createdStaff.id)) {
      staffList.value.push(createdStaff);
    }
  } catch (error) {
    console.error('Error creating staff:', error);
  }
};


// 查看員工
const viewStaff = async (id: number) => {
  try {
    const staff = await getStaffByIdAPI(id);
    alert(`Name: ${staff.name}\nPosition: ${staff.position}\nSalary: ${staff.salary}`);
  } catch (error) {
    console.error('Error fetching staff details:', error);
  }
};

// 更新員工
const updateStaff = async (updatedStaff: Staff) => {
  try{
  const index = staffList.value.findIndex((staff) => staff.id === updatedStaff.id);
  if (index !== -1) {
    staffList.value[index] = updatedStaff;
  }
  await fetchStaffList();
  console.log('Staff updated successfully:', updatedStaff);
  } catch (error) {
    console.error('Error updating staff in StaffList:', error);
  }
};

// const updateStaff = async (updatedStaff: Staff) => {
//   try {
//     await updateStaffAPI(updatedStaff.id, updatedStaff); // 調用 API 更新員工
//      const index = staffList.value.findIndex((staff) => staff.id === updatedStaff.id);
//     if (index !== -1) {
//       // 更新當前列表中的員工數據
//     //   staffList.value[index] = { ...response }; // 用 API 返回的數據更新
//     //   staffList.value = [...staffList.value]; // 更新整個引用，確保 Vue 重新渲染
//     }
//     await fetchStaffList(); // 重新加載數據
//     // fetchStaffList();
//     window.location.reload();
//     isEditDialogOpen.value = false; // 關閉編輯彈窗
//   } catch (error) {
//     console.error('Error updating staff:', error);
//   }
// };
// const updateStaff = async (updatedStaff: Staff) => {
//   try {
//     const response = await updateStaffAPI(updatedStaff.id, updatedStaff); // 調用 API 更新員工
//     const index = staffList.value.findIndex((staff) => staff.id === updatedStaff.id);
//     if (index !== -1) {
//        // 更新當前列表中的員工數據
//        staffList.value[index] = { ...staffList.value[index], ...response };
//     }
    
//     staffList.value = [...staffList.value]; // 強制觸發 Vue 響應式更新
//     await nextTick(); // 等待 DOM 更新
//     console.log('Updated staffList:', staffList.value); // 驗證數據更新
//     isEditDialogOpen.value = false; // 關閉編輯彈窗
//   } catch (error) {
//     console.error('Error updating staff:', error);
//   }
// };

// 刪除員工
const deleteStaff = async () => {
  if (selectedStaff.value) {
    try {
      // 本地即時更新
      const removedId = selectedStaff.value.id;
      staffList.value = staffList.value.filter((staff) => staff.id !== removedId);

      // 調用 API 刪除員工
      await deleteStaffAPI(removedId);

      // 加載最新數據
      fetchStaffList();
      isDeleteDialogOpen.value = false; // 關閉彈窗
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  }
};


// 統一的表頭樣式（背景 `primary`、文字白色）
const headerStyle: CSSProperties = {
  color:'white',
  borderColor: 'rgba(240, 240, 240, 0.2)',
  padding: '1rem',
  textAlign: 'center',
  fontWeight: 'bold',
};
</script>

<style scoped>
.v-btn {
  margin: 8px;
}
th {
  border: 1px solid #ddd; /* 可選：添加表頭邊框 */
}
.v-table--density-default {
  --v-table-header-height: 0px; /* 你想設置的新高度 */
}
</style>
