<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="d-flex justify-space-between align-center mb-4">
          <h1>Staff List</h1>
            <!-- 新增員工按鈕 -->
            <v-btn color="green" @click="goToCreateStaff">Create Staff</v-btn>
        </div>

        <!-- 使用 Vuetify 的 v-data-table -->
        <v-data-table
          :headers="headers"
          :items="staffList"
          item-value="id"
          class="elevation-1"
        >
       
        <!-- 自定義表頭插槽 -->
          <template v-slot:thead>
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.text"
                  :style="headerStyle"
                >
                  {{ header.text }}
                </th>
              </tr>
            </thead>
          </template>

         

          <!-- 自定義操作按鈕插槽 -->
          <template v-slot:[`item.actions`]="{ item }">
                      <v-btn color="yellow" @click="editStaff(item.id)">Edit</v-btn>
                      <v-btn color="blue" @click="viewStaff(item.id)">View</v-btn>
                      <v-btn color="red" @click="handleDeleteStaff(item.id)">Delete</v-btn>
           </template>
         
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllStaff, deleteStaff } from '../api/StaffService';
import { CSSProperties } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 定義 Staff 接口
interface Staff {
  id: number;
  name: string;
  position: string;
  salary: number;
}

// 定義表頭
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
    staffList.value = await getAllStaff();
  } catch (error) {
    console.error('Error fetching staff list:', error);
  }
};

// 組件掛載時調用
onMounted(fetchStaffList);

// 新增員工
const goToCreateStaff = () => {
  alert('Create new staff!');
  router.push('/create-staff'); // 跳轉到新增員工頁面
};

// 編輯員工
const editStaff = (id: number) => {
  alert(`Edit staff with id: ${id}`);
};

// 查看員工
const viewStaff = (id: number) => {
  alert(`View staff with id: ${id}`);
};

// 刪除員工
const handleDeleteStaff = async (id: number) => {
  try {
    await deleteStaff(id);
    alert(`Staff with id ${id} deleted successfully.`);
    await fetchStaffList(); // 刷新員工列表
  } catch (error) {
    console.error('Error deleting staff:', error);
  }
};


// 統一的表頭樣式（背景 `primary`、文字白色）
const headerStyle: CSSProperties = {
  backgroundColor: 'indigo', // 使用 Vuetify 主題色
  color:'white',
  borderColor: 'rgba(240, 240, 240, 0.2)',
  padding: '1rem',
  textAlign: 'center',
  fontWeight: 'bold',
};
</script>

<style scoped>
.v-btn {
  margin: 0 4px;
}

th {
  border: 1px solid #ddd; /* 可選：添加表頭邊框 */
}
.v-table--density-default {
  --v-table-header-height: 0px; /* 你想設置的新高度 */
}
</style>
