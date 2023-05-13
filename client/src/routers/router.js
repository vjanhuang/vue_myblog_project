import {createRouter, createWebHashHistory} from "vue-router"

let routes = [
{
    path:"/",
    component:()=>import("../views/HomePage.vue")
},
{
    path:"/login",
    component:()=>import("../views/Login.vue")
},
{
    path:"/detail",
    component:()=>import("../views/Detail.vue")
},
{
    path:"/dashboard",
    component:()=>import("../views/Dashboard.vue"),
    children:[
        {path:"/dashboard/category",component:()=>import("../views/Category.vue")},
        {path:"/dashboard/article",component:()=>import("../views/Article.vue")}
    ]
}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export {router, routes}