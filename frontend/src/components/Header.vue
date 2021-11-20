<script lang="ts">
import { defineComponent, ref } from "vue";
import { Setting } from "@element-plus/icons";

export default defineComponent({
  name: "Header",
  components: {
    Setting,
  },
});
</script>

<template>
  <el-container style="border: 1px solid rgba(238, 238, 238, 0.267)">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <el-icon style="margin-right: 15px">
          <setting />
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
