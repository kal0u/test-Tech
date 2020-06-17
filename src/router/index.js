import Vue from 'vue'
import Router from 'vue-router'
import productList from '@/components/productList'
import productDetail from '@/components/productDetail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/',
      name: 'Product',
      component: productList
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: productDetail
    }
  ]
})
