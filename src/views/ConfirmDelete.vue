<template>
    <v-dialog v-model="isDialogOpen" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Confirm Delete</span>
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete <strong>{{ staffName }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="confirmDelete">Delete</v-btn>
          <v-btn color="secondary" @click="cancelDelete">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  // 接收父组件的 props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    staffName: {
      type: String,
      required: true,
    },
  });
  
  // 定义事件
  const emit = defineEmits(['update:modelValue', 'delete']);
  
  // 本地状态
  const isDialogOpen = ref(false);
  
  // 同步父组件的 `modelValue` 到本地弹窗状态
  watch(
    () => props.modelValue,
    (newValue) => {
      isDialogOpen.value = newValue;
    }
  );
  
  // 确认删除
  const confirmDelete = () => {
    emit('delete'); // 通知父组件执行删除操作
    emit('update:modelValue', false); // 关闭弹窗
  };
  
  // 取消删除
  const cancelDelete = () => {
    emit('update:modelValue', false); // 关闭弹窗
  };
  </script>
  
  <style scoped>
  .v-btn {
    margin: 8px;
  }
  </style>
  