<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CSSProperties } from 'vue';

// 引入 Vuetify 的樣式
import 'vuetify/lib/styles/main.sass';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// 創建 Vuetify 實例
const vuetify = createVuetify({
  components,
  directives,
});

// 如果有自定義組件
// import StaffList from './views/StaffList.vue';
</script>

<template>
   <v-app>
    <v-main>
      <v-container>
        <router-view />
        <!-- StaffList Component -->
         <!-- <StaffList /> -->
        <!-- <h1>Test Component</h1>
        <p>If this renders, the issue is with the StaffList component.</p>  -->

        <!-- 測試 Vuetify 按鈕 -->
        <!-- <v-btn color="primary">Hello Vuetify</v-btn> -->
      </v-container>
    </v-main>
  </v-app>
</template>

