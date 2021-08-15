<template>
  <div class="wrapper" ref="wrapper">    
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script >
  import BScroll from 'better-scroll'
export default {
   name:'Scroll',
   data() {
     return {
       scroll: null,
     };
   },
   props: {
     probeType:{
       type:Number,
       default(){
         return 0
       }
     },
     pullUpLoad:{
       type:Boolean,
       default:false
     }
   }
   ,
   mounted(){
     this.scroll = new BScroll(this.$refs.wrapper,{
       click:true,
       probeType:this.probeType,
       pullUpLoad:this.pullUpLoad
     })

    //  监听滚动
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
    // 监听上拉加载
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
    
   },
   methods: {
       scrollTo(x,y,time=300){
         this.scroll && this.scroll.scrollTo(x,y,time)
       },
       finishPullUp(){
         this.scroll &&  this.scroll.finishPullUp()
       },
       refresh(){
         this.scroll &&  this.scroll.refresh()
         
       },
       getScrollY(){
         return this.scroll ? this.scroll.y : 0
       }
     }
  };
</script>
<style scoped>
</style>