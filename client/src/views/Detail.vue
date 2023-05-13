<template>
    <div class="container">
       <n-button @click="toHomePage">返回</n-button>
       <n-h1>{{ blogInfo.title }}</n-h1>
       <div class = "content-blog">
       <div v-html="blogInfo.content">
       </div>
    </div>
    </div>
</template>
<script setup>
import {ref,reactive,inject, onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()
const axios = inject("axios")
const blogInfo = reactive({
    content:"",
    title:""
})

onMounted(()=>{
    loadBlog()
})

const loadBlog = async ()=>{
    let res = await axios.get("/blog/detail?id="+route.query.id)
    blogInfo.content = res.data.results[0].content
    blogInfo.title = res.data.results[0].title
}
const toHomePage = ()=>{
    router.push('/')
}
</script>
<style lang="scss" scoped>
.container{
    width:1200px;
    margin:0 auto;
}
.blog-content img{
    max-width: 100% !important;
}
</style>