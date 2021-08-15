import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    // mutations唯一摸底就是修改state的状态
    // mutations的每一个方法中尽可能单一（简单一点————做一件事）
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
    }

}