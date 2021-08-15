<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed" /> 


    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" ref="tabControl2" /> 
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 组件要想监听事件需要添加native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />

  </div>
</template>
<script >
import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'


import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemListenerMixin,backTopMixin} from '@/common/mixin'



export default {
   name:'Home',
   components: {
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodsList,
     Scroll,
     
   },
   mixins: [itemListenerMixin,backTopMixin],
   data () {  
     return {
      //  保存数据
       banners:[],
       recommends:[],
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]},
       },
       currentType:'pop',
      //  tabConter距离顶部的距离
       tabOffsetTop:0,
       isTabFixed:false,
       saveY:0,

     }
   },
   computed: {
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
   created () {
    //  1.请求多个数据
     this.getHomeMultidata()
    //  2.请求商品数据
     this.getHomeGoods('pop')  
     this.getHomeGoods('sell')  
     this.getHomeGoods('new')  
   },

   methods: {
    //  事件监听相关
      tabClick(index){
        switch(index){
          case 0 :
            this.currentType = 'pop'
            break
          case 1 :
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      
      contentScroll(position){
        // 1.判断backtop是否显示
        this.showBackTop(position)
        // 2.决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y)>this.tabOffsetTop
        },
        // 监听加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        // 组件.$el就是获取到组件元素标签
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
          // console.log(this.$refs.tabControl.$el.offsetTop);
      }
      ,
      // **************************************************************
      



    //  网络请求相关
       getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
       },
       getHomeGoods(type){
         const page =  this.goods[type].page+1
         getHomeGoods(type,page).then(res=>{
          //  console.log(res.data.list);
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page+=1
          this.$refs.scroll.finishPullUp()
        })   
       }
      },
      // 活跃状态
      activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
      },
      // 离开
      deactivated(){
        // 保存savry值
        this.saveY=this.$refs.scroll.getScrollY
        // 取消全局事件监听
        this.$bus.$off('itemImageLoad',this.itemImgListeber)
      }
      
  };
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;*/
  z-index: 10; 
}
.content {
  overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style> 