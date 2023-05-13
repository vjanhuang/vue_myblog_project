<template>
    <div class="main-panel">
        <div class="menus">
            <div v-for="(menu,index) in menus" @click="toPage(menu)">
                {{menu.name}}
            </div>
        </div>
        <div style="padding:20px;width: 100%;">
            <router-view></router-view>
        </div>
        <div class="title">
            后台管理系统
        </div>
    </div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
 
const router = useRouter()

let menus = [
    {name:"文章管理",href:"/dashboard/article"},
    {name:"分类管理",href:"/dashboard/category"},
    {name:"退出",href:"logout"}
]

const toPage = (menu)=>{
    if(menu.href == "logout"){
        router.push("/login")
    }else{
        router.push(menu.href)
    }
}
</script>

<style lang="scss" scoped>
.main-panel{
    display: flex;//水平
    color:#64676a;
    max-width: 800px;
}
.menus{
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 100px;
    height: 95vh;
    border-right:1px solid #dadada;
    div{
        cursor: pointer;
        &:hover{
            color:#fd760e;
        }
    }
}
.title{
    font-size: 35px;
    font-weight: bold;
    text-align: right;
    bottom: 20px;
    position: fixed;
    right:calc((100vw - 1200px)/2);
    color:rgba(0,0,0,20%);
}
</style>