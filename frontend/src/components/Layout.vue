<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import AccountList from "./AccountList.vue";

export default defineComponent({
  components: {
    Header,
    Sidebar,
    AccountList
},
  setup() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };

    const tableData = ref(Array(20).fill(item));

    return {
      tableData,
    };
  },
});
</script>

<template>
  <div>
    <Header></Header>
    <el-container style="border: 1px solid rgba(238, 238, 238, 0.267)">
      <Sidebar></Sidebar>
      <AccountList></AccountList>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1c7;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
</style>
