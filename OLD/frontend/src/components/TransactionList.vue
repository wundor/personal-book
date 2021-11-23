<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
export default defineComponent({
    data() {
        return {
            transactions: [],
            state: ref(""),
        };
    },
    mounted() {
        this.getTransactions();
    },
    methods: {
        getTransactions() {
            axios
                .get(`${this.$api}/transactions`)
                .then((response) => (this.transactions = response.data));
        },
        querySearch(queryString: string, callback: any) {
            const results = queryString
                ? this.transactions.filter((transaction: { name: string; id: string }) => {
                    return (
                        transaction.name.toLowerCase().indexOf(queryString.toLowerCase()) ===
                        0
                    );
                })
                : this.transactions;
            callback(results);
        },
        handleSelect(item: string) {
            console.log(item);
        },
        addTransaction() {
            console.log(this.state);
            axios
                .post(`${this.$api}/transactions`, {
                    name: this.state,
                })
                .then((response) => {
                    console.log("Everything is awesome.");
                    this.state = "";
                    this.getTransactions();
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
                value-key="id"
                class="inline-input"
                placeholder="Account name"
                @select="handleSelect"
            />
            <el-button @click="addTransaction">Add transaction</el-button>
        </el-header>

        <el-container>
            <el-table :data="transactions" :fit="true">
                <el-table-column prop="timestamp" label="Time" width="350"></el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
            </el-table>
        </el-container>
    </el-container>
</template>

<style></style>
