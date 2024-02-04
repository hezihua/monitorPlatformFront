<template>
    <div class="wraps">
        <div>
            <el-input v-model="search.type" style="width:300px;"></el-input>
            <el-button @click="init" style="margin-left:10px;">搜索</el-button>
            <!-- <el-button @click="openDialog" type="primary" style="margin-left:10px;">添加</el-button> -->
            <!-- <el-button @click="handleAdd" type="primary" style="margin-left:10px;">report</el-button> -->
        </div>
        <el-table border :data="tableData" style="width: 100%;margin-top: 30px;">
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="info" label="标题" >
                <template #default="scope">
                    {{ scope.row.info.title }}
                </template>
            </el-table-column>
            <el-table-column prop="info" label="代理" >
                <template #default="scope">
                    {{ scope.row.info.userAgent }}
                </template>
            </el-table-column>
            <el-table-column prop="info" label="url" >
                <template #default="scope">
                    {{ scope.row.info.url }}
                </template>
            </el-table-column>
            <el-table-column prop="reportTime" label="上报时间" />
            <el-table-column prop="detail" label="错误类型" >
                <template #default="scope">
                    {{ scope.row.detail.type }}
                </template>
            </el-table-column>
            <el-table-column prop="detail" label="错误原因" >
                <template #default="scope">
                    {{ scope.row.detail.reason }}
                </template>
            </el-table-column>
            <el-table-column>
                <template #default="scope">
                    <!-- <el-button @click="edit(scope.row)">编辑</el-button> -->
                    <el-button @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="changeSize" style="float:right;margin-top:10px;" background layout="prev, pager, next" :total="total" />
    </div>
 
    <el-dialog v-model="dialogVisible" title="弹框" width="50%">
        <el-form :model="form">
            <el-form-item prop="name" label="名称">
                <el-input v-model="form.name" placeholder="名称" />
            </el-form-item>
            <el-form-item prop="desc" label="描述">
                <el-input v-model="form.desc" placeholder="描述">
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">关闭</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { addErrorInfo, updateErrorInfo, delErrorInfo, getList } from '../../server'
const total = ref<number>(0)
//搜索框
const search = reactive({
    type: "",
    page:1,
    pageSize:10
})
//表单
const form = reactive({
    name: "",
    desc: "",
    id: 0
})
//清空数据
// const resetForm = reactive({ ...form })
//表格数据
const tableData = ref([])
//弹框开关
const dialogVisible = ref<boolean>(false)
// const openDialog = () => {
//     dialogVisible.value = true;
//     Object.assign(form, resetForm)
// }
//初始化表格数据
const init = async () => {
    const list = await getList(search)
    tableData.value = list?.data ?? []
    total.value = list?.total ?? 0
}
init()
const changeSize = (page: number) => {
   search.page = page
   init()
}

const getBaseInfo = ()=> {
    return {
      title: document.title,
      userAgent: window.navigator.userAgent,
      url: window.location.protocol + '//' + window.location.host + window.location.pathname,
      locale: window.navigator.language,
      time: (new Date).getTime()
    }
}

// const handleAdd = () => {
//     let params = {
//             reportTime: '2024/1/23',
//             type: 'unhandledrejection',
//             info: getBaseInfo(),
//             detail: {
//                 reason: 'event.reason',
//                 timeStamp: 'event.timeStamp',
//                 type: 'event.type'
//             }
//     };
//     console.log(encodeURIComponent(JSON.stringify(params)));
//         (new Image).src =  "https://gitlab.itomx.cn/monitorPlatform/error-info/report?event=" + encodeURIComponent(JSON.stringify(params));
// }
//保存 和修改 表格数据
const save = async () => {
    if (form.id) {
        await updateErrorInfo(form)
    } else {
       
        await addErrorInfo({
            reportTime: '2024/1/23',
            type: 'unhandledrejection',
            info: getBaseInfo(),
            detail: {
                reason: 'event.reason',
                timeStamp: 'event.timeStamp',
                type: 'event.type'
            }
        })
    }
 
    close()
    init()
}
//删除表格数据
const deleteRow = async (row: {[key: string]: any}) => {
    await delErrorInfo({ id: row.id })
    init()
}
//获取 详情
// const edit = (row: any) => {
//     dialogVisible.value = true;
//     Object.assign(form, row)
// }
//关闭弹框
const close = () => {
    dialogVisible.value = false;
}
</script>
 
<style  scoped>

 
html,
body {
    background: #ccc;
}
 
.wraps {
 
    height: 100vh;
    padding: 30px;
}
</style>