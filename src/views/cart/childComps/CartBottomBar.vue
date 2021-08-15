<template>
  <div class="bottom-bar">
    <div class="ckeck-content" >
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>
<script >
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'


export default {
   name:'CartBottomBar',
   components: {
     CheckButton
   },
   computed: {
     ...mapGetters(['cartList']),
     totalPrice(){
      //  filter过滤函数 reduce preValue是上一次的值  toFixed（保留小数位数）
      //  return '￥'+ this.$store.state.cartList.filter(item=>{
       return '￥'+ this.cartList.filter(item=>{
         return item.checked
       }).reduce((preValue,item)=>{
         return preValue + item.price*item.count
       },0).toFixed(2)
     },
     checkLength(){
       return this.cartList.filter(item=>item.checked).length
     },
     isSelectAll(){
      //  return !(this.cartList.filter(item=>!item.checked).length)
      if(this.cartList.length ==0) return false
      return !(this.cartList.find(item=>!item.checked))
     }
   },
   methods: {
     checkClick(){
       if(this.isSelectAll){
         this.cartList.forEach(item => item.checked=false)
       }
      else{
         this.cartList.forEach(item => item.checked=true)
       }
     }
   }
  };
</script>
<style scoped>
.bottom-bar{
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;

}
.ckeck-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 100px;
  color: #fff;
  text-align: center;
  background: red;
}
</style>