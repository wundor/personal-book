<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  data() {
    return {
      accounts: [],
      newAccountForm: {
        name: '',
        balance: '',
      },
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
      callback(results);
    },
    handleSelect(item: string) {
    },
    addAccount() {
      axios
        .post(`${this.$api}/accounts`, {
          name: this.newAccountForm.name,
          startingBalance: this.newAccountForm.balance,
        })
        .then((response) => {
          this.dialogVisible = false;
          this.newAccountForm.name = "";
          this.newAccountForm.balance = "";
          this.getAccounts();
          ElMessage({
            message: 'Account was added!',
            type: 'success',
            center: true,
          })
        })
        .catch((error) => {
          console.warn("Not good man :(");
        });
    },
    submitForm(formName: string) {
      this.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          this.addAccount()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  setup() {
    const dialogVisible = ref(false)

    const handleClose = (done: any) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    return {
      dialogVisible,
      handleClose,
    }
  },
});
</script>

<template>
  <el-container>
    <el-header>
      <el-button @click="dialogVisible = true">Add account</el-button>
    </el-header>
    <el-dialog
      v-model="dialogVisible"
      title="Add new account"
      width="30%"
      :before-close="handleClose"
    >
      <el-container direction="vertical">
        <el-form
          ref="newAccountForm"
          :model="newAccountForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="name"
            prop="name"
            :rules="[
              { required: true, message: 'Name is required' },
            ]"
          >
            <el-autocomplete
              v-model.name="newAccountForm.name"
              type="name"
              :fetch-suggestions="querySearch"
              value-key="name"
              class="inline-input"
              placeholder="Account name"
              @select="handleSelect"
            />
          </el-form-item>
          <el-form-item
            label="balance"
            prop="balance"
            :rules="[
              { required: true, message: 'Starting balance is required' },
              { type: 'number', message: 'Starting balance must be a number' },
            ]"
          >
            <el-input
              v-model.number="newAccountForm.balance"
              @keyup.enter="submitForm('newAccountForm')"
              type="balance"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-container>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm('newAccountForm')">Add</el-button>
        </span>
      </template>
    </el-dialog>

    <el-container>
      <el-table :data="accounts" :fit="true">
        <el-table-column prop="id" label="ID" width="350"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
      </el-table>
    </el-container>
  </el-container>
</template>

<style></style>
