<template>
    <v-dialog v-model="isDialogOpen" max-width="600px">
      <template v-slot:default="dialog">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Staff</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-text-field
                label="Name"
                v-model="staff.name"
                :rules="[rules.required]"
                outlined
                required
              ></v-text-field>
  
              <v-text-field
                label="Position"
                v-model="staff.position"
                :rules="[rules.required]"
                outlined
                required
              ></v-text-field>
  
              <v-text-field
                label="Salary"
                v-model="staff.salary"
                :rules="[rules.required, rules.numeric]"
                outlined
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="handleSave" :disabled="!isFormValid">
              Save
            </v-btn>
            <v-btn color="secondary" @click="handleCancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import { updateStaffAPI } from '../api/StaffService';

  // 父組件傳入的 props
  const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  editStaff: {
    type: Object as () => Record<string, any> | undefined,
    required: false,
  },
});
  
  // 發出事件給父組件
  const emit = defineEmits(['update:modelValue', 'save']);
  
  // 本地狀態
  const isDialogOpen = ref(false);
  const isFormValid = ref(false);
  const staff = ref<Record<string, any>>({});
  
  // 表單校驗規則
  const rules = {
    required: (value: string) => !!value || 'This field is required.',
    numeric: (value: string) => !isNaN(parseFloat(value)) || 'This field must be a number.',
  };
  
  // 當父組件的 modelValue 改變時，同步本地彈窗狀態
  watch(
    () => props.modelValue,
    (newValue) => {
      isDialogOpen.value = newValue;
      if (newValue && props.editStaff) {
        staff.value = { ...props.editStaff }; // 初始化表單數據
      }
    }
  );
  
  // 保存按鈕事件
  const handleSave = async () => {
  try {
    if (!staff.value.id) {
      throw new Error('Invalid staff data: Missing staff ID.');
    }
   
    // 調用 API 保存數據
    const updatedStaff = await updateStaffAPI(staff.value.id, staff.value);
    
    // 將更新後的數據發送給父組件
    emit('save', updatedStaff);
    emit('update:modelValue', false);    // 關閉彈窗
    

  } catch (error) {
    console.error('Error saving staff:', error);
    alert('Failed to save staff data. Please try again.');
  }
};
  
  // 取消按鈕事件
  const handleCancel = () => {
    emit('update:modelValue', false); // 關閉彈窗
  };
  </script>
  
  <style scoped>
  .v-btn {
    margin: 8px;
  }
  </style>
  