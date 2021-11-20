<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      accounts: [],
      state: ref(""),
    };
  },
  mounted() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      axios
        .get(`${this.$api}/accounts`)
        .then((response) => (this.accounts = response.data));
    },
    querySearch(queryString: string, callback: any) {
      const results = queryString
        ? this.accounts.filter((account: { name: string; id: string }) => {
            return (
              account.name.toLowerCase().indexOf(queryString.toLowerCase()) ===
              0
            );
          })
        : this.accounts;
      const output: string[] = [];
      callback(results);
    },
    handleSelect(item: string) {
      console.log(item);
    },
    addAccount() {
      console.log(this.state);
      axios
        .post(`${this.$api}/accounts`, {
          name: this.state,
        })
        .then((response) => {
          console.log("Everything is awesome.");
          this.state = "";
          this.getAccounts();
        })
        .catch((error) => {
          console.warn("Not good man :(");
        });
    },
  },
});
</script>

<template>
  <el-container>
    <el-header>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        value-key="name"
        class="inline-input"
        placeholder="Account name"
        @select="handleSelect"
      />
      <el-button @click="addAccount">Add account</el-button>
    </el-header>

    <el-container>
      <el-table :data="accounts" :fit="true">
        <el-table-column prop="id" label="ID" width="320"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
      </el-table>
    </el-container>
  </el-container>
</template>

<style></style>
