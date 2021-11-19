<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Message, Menu, Setting } from '@element-plus/icons'

export default defineComponent({
    components: {
        Message,
        Setting,
        'icon-menu': Menu,
    },
    setup() {
        const item = {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        }

        const tableData = ref(Array(20).fill(item))

        return {
            tableData,
        }
    },
})
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
                        <el-dropdown-item>Add</el-dropdown-item>
                        <el-dropdown-item>Delete</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span>Tom</span>
        </el-header>

        <el-container>
            <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1']">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <message />
                            </el-icon>Navigator One
                        </template>
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

            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="date" label="Date" width="140"></el-table-column>
                    <el-table-column prop="name" label="Name" width="120"></el-table-column>
                    <el-table-column prop="address" label="Address"></el-table-column>
                </el-table>
            </el-main>
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