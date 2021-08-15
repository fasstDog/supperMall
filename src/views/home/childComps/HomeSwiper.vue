<!--  -->
<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script >
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
   name:'HomeSwiper',
   components: {
     Swiper,
     SwiperItem,
   },
   data(){
     return{
      //  事件只发生一次
       isLoad:false
     }
   },
   props: {
     banners:{
       type:Array,
       default(){
         return []
       }
     }
   },
   methods:{
     imgLoad(){
       if(!this.isLoad){
       this.$emit('swiperImageLoad')
        this.isLoad=true
       }
     }
   }
  };
</script>
<style scoped>
</style>