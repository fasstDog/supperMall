<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>


    <!-- 商品列表 -->
    <cart-list  />


    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>
<script >

import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
   name:'Cart',
   components: {
     NavBar,
     CartList,
     CartBottomBar
   },data() {
     return {
       num: 0,
     };
   },
   computed: {
    //  直接引用vuex中的getters当计算属性(将store中的getter映射到局部计算属性中)
      // ...mapGetters(['cartLength',]) 
      ...mapGetters({
        length:'cartLength',
      })
      //  return this.$store.state.cartList.length
      // return this.$store.getters.cartLength
   }
  };
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}

</style>