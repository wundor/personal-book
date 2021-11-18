<template>
  <div>
    <h1>Accounts:</h1>
    <div v-for="post in accounts" v-bind:key="post.id">
      {{ post.name }}
    </div>
    <InputText type="text" v-model="newAccount" />
    <Button label="Add new" @click="addAccount" />
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
