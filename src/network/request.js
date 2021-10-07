import axios from "axios";
export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
            baseURL: 'http://152.136.185.210:7878/api/hy66',
        })
        // 2.1axios的拦截器（请求拦截）
    instance.interceptors.request.use(config => {
            // 1.拦截config中的一些不符合服务器的信息

            // 2.每次发送网络请求时添加请求图标（加载动画）

            // 3.某些网络请求（登录），必须携带一些特殊的信息（token）
            // console.log(config);
            // 返回config以继续
            return config
        },
        err => {
            console.log(err);
        });
    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    });



    //3. 发送真正的网络请求
    // instance()的返回值就是PROMISE
    return instance(config)
}
// ***********************************************************************************************************************
// ***********************************************************************************************************************
// ***********************************************************************************************************************

// export function request(config) {
//     return new Promise((resolve, reject) => {
//         // 1.创建axios实例
//         const instance = axios.create({
//             baseURL: 'http://152.136.185.210:7878/api/m5',
//             timeout: 5000
//         })


//         // 发送真正的网络请求
//         instance(config).then(res => {
//             resolve(res)
//         }).catch(err => {
//             reject(err)
//         })
//     })
// }
// ***********************************************************************************************************************
// ***********************************************************************************************************************
// ***********************************************************************************************************************
// export function request(config, success, failure) {
//     // 1.创建axios实例
//     const instance = axios.create({
//         baseURL: 'http://152.136.185.210:7878/api/m5',
//         timeout: 5000
//     })


//     // 发送真正的网络请求
//     instance(config).then(res => {
//         // console.log(res);
//         success(res)
//     }).catch(err => {
//         // console.log(err);
//         failure(err)
//     })
// }
