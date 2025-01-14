<template>
    <v-app>
      <v-main>
        <v-container>
          <h1>Create New Staff</h1>
  
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
  
            <v-btn
              type="button"
              color="primary"
              @click="handleCreateStaffSubmit"
              :disabled="!isFormValid"
            >
              Submit
            </v-btn>
            <v-btn type="button" color="secondary" @click="goBack">Cancel</v-btn>
          </v-form>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // 路由導航
  const router = useRouter();
  console.log('Current Router:', router);
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
        router.push('/'); // 返回員工列表頁面
      } catch (err: any) {
        console.error('Error creating staff:', err);
        alert(`Error creating staff: ${err.message}`);
      }
    }
  };
  
  // 返回上一頁
  const goBack = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .v-btn {
    margin: 8px;
  }
  </style>
  