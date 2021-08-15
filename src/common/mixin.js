import { debonuce } from './utils'
import { POP, NEW, SELL } from "./const";

import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListeber: null
        }
    },
    mounted() {
        const refresh = debonuce(this.$refs.scroll.refresh, 100)
            //  监听item图片加载
        this.itemImgListeber = () => {
            // console.log(this.$refs.scroll.refresh);
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListeber)
    }
}
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            // 三个参数x，y，t
            this.$refs.scroll.scrollTo(0, 0)
        },
        showBackTop(position) {
            this.isShowBackTop = (-position.y) > 1000
        }
    }
}
export const tabControlMixin = {
    data: function() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2:
                    this.currentType = SELL
                    break
            }
            console.log(this.currentType);
        }
    }
}