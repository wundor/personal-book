<script lang="ts">
import { defineComponent, ref } from 'vue'
import * as axios from 'axios'

export default defineComponent({
    methods: {
        async getAccounts() {
            try {
                const response = await axios.get(
                    "http://localhost:4001/accounts"
                );
                // JSON responses are automatically parsed.
                this.posts = response.data;
            } catch (error) {
                console.log(error);
            }

        }
    }
})
</script>

<template>
    <el-container style="border: 1px solid rgba(238, 238, 238, 0.267)">
        <el-container>
            <el-table :data="accounts">
                <el-table-column prop="date" label="Date" width="140"></el-table-column>
                <el-table-column prop="name" label="Name" width="120"></el-table-column>
                <el-table-column prop="address" label="Address"></el-table-column>
            </el-table>
        </el-container>
    </el-container>
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