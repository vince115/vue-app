<template>
  <v-dialog v-model="isDialogOpen" max-width="600px">
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create New Staff</span>
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
          <v-btn
            type="button"
            color="primary"
            @click="handleCreateStaffSubmit"
            :disabled="!isFormValid"
          >
            Submit
          </v-btn>
          <v-btn type="button" color="secondary" @click="handleCancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

// 接收父组件的 `props`
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

// 定義事件
const emit = defineEmits(['update:modelValue', 'create']);

// 彈窗狀態
const isDialogOpen = ref(false);
// 表單驗證狀態
const isFormValid = ref(false);
// 員工數據
const staff = ref({
  name: '',
  position: '',
  salary: '',
});

// 驗證規則
const rules = {
  required: (value: string) => !!value || 'This field is required.',
  numeric: (value: string) =>
    !isNaN(parseFloat(value)) || 'This field must be a number.',
};

// 同步父组件的 `modelValue` 狀態到本地彈窗
watch(
  () => props.modelValue,
  (newValue) => {
    isDialogOpen.value = newValue;
    if (newValue) {
      staff.value = { name: '', position: '', salary: '' }; // 清空表单
    }
  }
);

// 提交表單
const handleCreateStaffSubmit = async () => {
  if (isFormValid.value) {
    try {
      const response = await fetch('https://localhost:7256/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff.value),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`API Error: ${errorMessage}`);
      }

      alert('Staff created successfully!');
      emit('create', staff.value); // 通知父组件
      emit('update:modelValue', false); // 關閉彈窗
    } catch (err: any) {
      console.error('Error creating staff:', err);
      alert(`Error creating staff: ${err.message}`);
    }
  }
};

// 取消創建
const handleCancel = () => {
  emit('update:modelValue', false); // 關閉弹窗
};
</script>

<style scoped>
.v-btn {
  margin: 8px;
}
</style>
