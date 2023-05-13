<template>
    <n-tabs v-model:value="tabvalue" justify-content="start" type="line" style="margin:10px">
      <n-tab-pane name="list" tab="文章列表">
          <div v-for = "(blog,index) in blogListInfo">
            <n-card :title="blog.title">
              {{ blog.content }}
              <template #footer>
                <n-space align="center">
                <div>发布时间：{{ blog.create_time }}</div>
                <n-button @click="toUpdate(blog)">修改</n-button>
                <n-button @click="toDelete(blog)">删除</n-button>
                </n-space>
            </template>
            </n-card>
          </div>
          <n-space>
            <div @click="toPage(pageNum)" v-for="pageNum in pageInfo.pageCount">
              <div :style="'color:'+(pageNum==pageInfo.page ? 'green':'')+';cursor:pointer'">{{ pageNum }}</div>
            </div>
          </n-space>
      </n-tab-pane>
      <n-tab-pane name="add" tab="添加文章">
        <n-form>
            <n-form-item label="标题">
                <n-input v-model:value = "addArticle.title" placeholder="请输入标题"/>
            </n-form-item>
            <n-form-item label="类别">
              <n-select v-model:value="addArticle.categoryId" :options="categoryOptions" />
            </n-form-item>
            <n-form-item label="内容">
                <RichTextEditor v-model="addArticle.content"></RichTextEditor>
            </n-form-item>
            <n-form-item label="">
                <n-button @click="add">提交</n-button>
            </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="update" tab="修改文章">
        <n-form-item label="标题">
                <n-input v-model:value = "updateArticle.title" placeholder="请输入标题"/>
            </n-form-item>
            <n-form-item label="类别">
              <n-select v-model:value="updateArticle.categoryId" :options="categoryOptions" />
            </n-form-item>
            <n-form-item label="内容">
                <RichTextEditor v-model="updateArticle.content"></RichTextEditor>
            </n-form-item>
            <n-form-item label="">
                <n-button @click="update">修改</n-button>
            </n-form-item>
      </n-tab-pane>
    </n-tabs>
</template>
<script setup>
import RichTextEditor from '../components/RichTextEditor.vue'
import {ref, reactive, onMounted, inject} from 'vue'

const axios = inject("axios")//全局注入进来
const message = inject("message")
const categoryOptions = ref([])
const tabvalue = ref('list')
const dialog = inject("dialog")
const blogListInfo = ref([])
const pageInfo = reactive({
  page:1,
  pageSize:3,
  count:0,
  pageCount:0
})
const loadCategorys = async ()=>{
   let res = await axios.get("/category/list")
   categoryOptions.value = res.data.data.map((item)=>{
    return {
      label:item.name,
      value:item.id
    }
   })
}
const loadBlogs = async ()=>{
   let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
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
onMounted(()=>{
  loadBlogs()
  loadCategorys()
})
//文章添加数据
const addArticle = reactive({
    categoryId: 0,
    title: "",
    content: "hello"
})
const updateArticle = reactive({
    id:0,
    categoryId: 0,
    title: "",
    content: "hello"
})
const add = async ()=>{
   let res = await axios.post("/blog/_token/add",{title:addArticle.title,categoryId:addArticle.categoryId,content:addArticle.content})
   if(res.data.code == 200){
      message.info(res.data.msg)
   }else{
      message.error(res.data.msg)
   }
}
const toPage = async (pageNum)=>{
  pageInfo.page = pageNum
  loadBlogs()
}
const toUpdate = async (blog)=>{
  tabvalue.value='update'
  let res = await axios.get('/blog/detail?id='+blog.id)
  updateArticle.id = blog.id
  updateArticle.title = res.data.results[0].title
  updateArticle.content = res.data.results[0].content
  updateArticle.categoryId = res.data.results[0].category_id
}
const update = async ()=>{
    let res = await axios.put('/blog/_token/update',updateArticle)
    if(res.data.code==200){
        message.info(res.data.msg)
        loadBlogs()
    }else{
        message.error(res.data.msg)
    }
}
const toDelete = async (blog)=>{
      dialog.warning({
        title: '警告',
        content: '是否要删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          let res = await axios.delete('/blog/_token/delete?id='+blog.id) 
          if(res.data.code==200){
              message.info(res.data.msg)
          loadBlogs()
          }else{
              message.error(res.data.msgs)
          }
        },
        onNegativeClick: () => {}
      })
}
</script>