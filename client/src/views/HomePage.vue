<template>
    <div class="container">
        <div class="nav">
            <div @click="homepage">首页</div>
            <div>
            <n-popselect @update:value="searhByCategory" v-model:value="selectCategory" :options="options" trigger="click">
            分类
            </n-popselect>
            <span>{{ currentCategory }}</span>
            </div>
            <div @click="dashboard">后台</div>
        </div>
        <n-divider/>
        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{width:'500px'}" placeholder="查询条件"></n-input>
            <n-button type="primary" ghost @click="loadBlogs">搜索</n-button>
        </n-space>
        <div v-for = "(blog,index) in blogListInfo" style="margin-bottom: 10px;cursor: pointer;">
            <n-card :title="blog.title" @click="toDetail(blog)">
              {{ blog.content }}
              <template #footer>
                <n-space align="center">
                <div>发布时间：{{ blog.create_time }}</div>
                </n-space>
            </template>
            </n-card>
        </div>
        <n-pagination @click="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount"/>
        <n-divider/>
        <div class="footer">
            <div>Power by xxxx</div>
            <div>XICP备案xxxx号</div>
        </div>
    </div>
</template>
<script setup>
import {ref, reactive, onMounted, inject, computed} from 'vue'
import {useRouter,useRoute} from 'vue-router'

const router = useRouter()

const axios = inject("axios")//全局注入进来
const blogListInfo = ref([])
const pageInfo = reactive({
  page:1,
  pageSize:3,
  count:0,
  pageCount:0,
  keyword:"",
  categoryId:0
})

const selectCategory = ref(0)
const options = ref([])
const currentCategory = computed(()=>{
    let selectedCategory = options.value.find((option)=>{return option.value == selectCategory.value})
    return selectedCategory ? selectedCategory.label : ""
})

onMounted(()=>{
    loadCategorys()
    loadBlogs()
})

const loadCategorys = async ()=>{
    let res = await axios.get('/category/list')
    options.value = res.data.data.map((item)=>{
        return{
            label:item.name,
            value:item.id
        }
    }) 
}
const homepage = ()=>{
    router.push('/')
}
const dashboard = ()=>{
    router.push('/dashboard')
}
const searhByCategory = (categoryId)=>{
    pageInfo.categoryId = categoryId
    loadBlogs()
}
const loadBlogs = async ()=>{
   let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
   let temp_rows = res.data.data.rows
   for(let row of temp_rows){
        row.content += '...'
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDay()}日`
   }
   blogListInfo.value = temp_rows
   pageInfo.count = res.data.data.count
   pageInfo.pageCount = Math.ceil(pageInfo.count/pageInfo.pageSize)
}
const toDetail = (blog)=>{
    router.push({path:"/detail",query:{id:blog.id}})
}
</script>
<style lang="scss" scoped>
.container{
    margin:0 auto;
    width:1200px
}
.search{
    margin-bottom: 15px;
}
.nav{
    display: flex;
    padding-top: 25px;
    font-size: 20px;
    color:aquamarine;
    div{
        cursor: pointer;
        margin-right: 20px;
        &:hover{
            color:orange
        }
        span{
            font-size: 14px;
        }
    }
}
.footer{
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>