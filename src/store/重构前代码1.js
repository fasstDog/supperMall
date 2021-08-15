import Vue from "vue";
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 创建Store对象
const store = new Vuex.Store({
        state: {
            cartList: []
        },
        mutations: {
            // mutations唯一摸底就是修改state的状态
            // mutations的每一个方法中尽可能单一（简单一点）
            addCart(state, payload) {
                // payload新加商品
                // let oldProduct = null
                // for (let item of state.cartList) {
                //     if (item.iid === payload.iid) {
                //         oldProduct = item
                //     }
                // }
                // let index = state.cartList.indexOf(payload)
                let oldProduct = state.cartList.find(item => item.iid === payload.iid)

                // 判断
                if (oldProduct) {
                    // 若是有这个商品，数量加1
                    oldProduct.count += 1
                } else {
                    // 若是没有这个商品设置属性count=1
                    payload.count = 1
                    state.cartList.push(payload)
                }
            }
        }
    })
    // 3.挂载到vue实例中
export default store