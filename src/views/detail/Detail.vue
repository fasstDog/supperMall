<template>
  <div id="detail">
    <detail-nav-bar @titleClick='titleClick' ref="navbar" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" class="detail-goods-info" @imagesLoad="imagesLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast :message='message' :show="show" /> -->
  </div>
</template>
<script >
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'


  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import {itemListenerMixin,backTopMixin} from '@/common/mixin'
  import {debonuce} from '@/common/utils'

  import { mapActions } from 'vuex'

  // import Toast from 'components/common/toast/Toast'

export default {
  
   name:'Detail',
   components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     Scroll,
     DetailGoodsInfo,
     DetailParamInfo,
     DetailCommentInfo,
     GoodsList,
     DetailBottomBar,
    //  Toast
   },
   mixins: [itemListenerMixin,backTopMixin],
   data(){
     return{
       iid:'aaa',
       topImages:[],
       goods:{},
       shop:{},
       detailInfo:{},
       paramInfo:{},
       commentInfo:{},
       recommends:[],
       themeTopYs:[],
       getThemeTopY:null,
       currentIndex:0,
      //  message:'',
      //  show:false
     }
   }
   ,
   created () {
    //  保存传入的iid
     this.iid = this.$route.params.iid 
    //  根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      const data = res.result
      // 获取轮播图数据
      this.topImages = res.result.itemInfo.topImages
      // 获取商品信息数据
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 获取店铺信息数据
      this.shop = new Shop(data.shopInfo)
      // 获取商品的详细数据
      this.detailInfo = data.detailInfo
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 获取商品评论信息
      if(data.rate.cRate != 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    // 请求推荐数据
    getRecommend().then(res=>{
      this.recommends=res.data.list
    })
   
    // 获取标题元素距离顶部y值(进行防抖)
    this.getThemeTopY = debonuce(()=>{
      this.themeTopYs=[]
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
    },100)
   },
   methods: {
     ...mapActions(['addCart']),
     imagesLoad(){
       this.$refs.scroll.refresh()
       this.getThemeTopY()
     },
     titleClick(index){
       this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000)
     },
     contentScroll(position){
       const positiony = -position.y
       let length = this.themeTopYs.length
       for(let i = 0 ;  i<length-1  ; i++){        
        // if(
        //   this.currentIndex !==i &&((i<length-1 && positiony>=this.themeTopYs[i] && positiony<this.themeTopYs[i+1]) ||
        //   (i===length-1 && positiony>=this.themeTopYs[i]))
        // ){
        //   this.currentIndex = i
        //   this.$refs.navbar.currentIndex=this.currentIndex
        // }
        if(
          this.currentIndex !==i  && (i<length-1 && positiony>=this.themeTopYs[i] && positiony<this.themeTopYs[i+1])
        ){
            this.currentIndex = i
            this.$refs.navbar.currentIndex=this.currentIndex
        }
       }
       this.showBackTop(position)
     },
     addToCart(){
      //  获取购物车需要展示的信息添加
       const product = {}
       product.image= this.topImages[0]
       product.title = this.goods.title
       product.desc = this.goods.desc
       product.price = this.goods.lowNowPrice
       product.iid = this.iid
      //  console.log(product);
      //  添加到购物车中
        // this.$store.commit('addCart',product)
        // 在actions中new promise
        // this.$store.dispatch('addCart', product).then(res=>{
        //   console.log(res);
        // })
        // mapActions的使用
      this.addCart(product).then(res=>{
        // this.show=true
        // this.message = res
        // setTimeout(() => {
        //   this.show=false
        //   this.message = ''
        // }, 1500);
        this.$toast.show(res,2000)
      })
      
     }
   },
   destroyed () {
     // 取消全局事件监听
        this.$bus.$off('itemImageLoad',this.itemImgListeber)
   },
  };
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
.detail-goods-info {
  position: relative;
}
</style>