<template>
  <div class="card">
    <h1>Accounts:</h1>
    <div class="p-d-flex" v-for="account in accounts" v-bind:key="account.id">
      {{ account.name }}
    </div>
    <InputText type="text" v-model="newAccount" />
    <Button label="Add new" @click="addAccount" />

    <div class="card">
      <div class="flex card-container">
        <div class="flex-1 h-4rem text-white font-bold text-center p-4 border-round">1</div>
        <div class="flex-1 h-4rem bg-indigo-500 text-white font-bold text-center p-4 border-round mx-4">2</div>
        <div class="flex-1 h-4rem bg-indigo-500 text-white font-bold text-center p-4 border-round">3</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      accounts: [],
      newAccount: '',
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:4000/accounts');
        this.accounts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addAccount() {
      try {
        await axios.post('http://localhost:4000/accounts', {
          name: this.newAccount,
        });
        this.getData();
        this.newAccount = '';
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>
