<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
})
</script>

<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <el-icon style="margin-right: 15px">
          <a class="icon-btn mx-2">
            <carbon-settings />
          </a>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>View</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>Personal Book</span>
    </el-header>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1c7;
  color: var(--el-text-color-primary);
  line-height: 60px;
}
</style>
