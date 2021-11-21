<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
})
</script>

<template>
  <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <router-link to="/">
        <el-menu-item index="0">Home</el-menu-item>
      </router-link>

      <router-link to="/budget">
        <el-menu-item index="0">Budget</el-menu-item>
      </router-link>

      <el-sub-menu index="1">
        <template #title>Navigator One</template>
        <el-menu-item-group>
          <template #title>Group 1</template>
          <el-menu-item index="1-1">Option 1</el-menu-item>
          <el-menu-item index="1-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="1-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>Option4</template>
          <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style></style>
