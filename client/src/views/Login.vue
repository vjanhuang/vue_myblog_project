<template>
    <div class="login-panel">
    <n-card title="管理后台登录">
        <n-form :rules="rules" :model="admin">
        <n-form-item path="account" label="账号">
            <n-input v-model:value="admin.account" placeholder="请输入账号"/>
        </n-form-item>
        <n-form-item path="password" label="密码">
            <n-input v-model:value="admin.password" type="password" placeholder="请输入密码"/>
        </n-form-item>
        </n-form>
        <template #footer>
            <n-checkbox v-model:checked="admin.remember" label="记住我"/>
            <n-button @click="login">登录</n-button>
        </template>
    </n-card>
    </div>
</template>
<script setup>
import {ref,reactive,inject} from 'vue'
import {AdminStore} from '../stores/AdminStore'
import {useRouter,useRoute} from 'vue-router'
 
const axios = inject("axios")//全局注入进来
const adminStore = AdminStore()
const message = inject("message")

const router = useRouter()
const route = useRoute()

let rules = {
    account:[
        {required:true,message:"请输入账号",trigger:"blur"},
        {min:3,max:12,message:"账号长度在3到12个字符",trigger:"blur"}
    ],
    password:[
        {required:true,message:"请输入密码",trigger:"blur"},
        {min:4,max:14,message:"密码长度在4到14个字符",trigger:"blur"}
    ]
}

const admin = reactive({
    account:localStorage.getItem("account")||"",
    password:localStorage.getItem("password")||"",
    remember:localStorage.getItem("remember") == 1
})

const login = async ()=>{
    let result = await axios.post("/admin/login",{
        account:admin.account,
        password:admin.password
    })
    if(result.data.code == 200){
        adminStore.token = result.data.data.token
        adminStore.account = result.data.data.account
        adminStore.id = result.data.data.id
        message.info("登录成功")
        if(admin.remember){
            localStorage.setItem("account",admin.account)
            localStorage.setItem("password",admin.password)
            localStorage.setItem("remember",admin.remember?1:0)
        }
        router.push('/dashboard')
    }else{
        message.info("登录失败")
    }
}

</script>
<style lang = "scss" scoped>
.login-panel{
    width: 500px;
    margin: auto;
    margin-top: 130px;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>