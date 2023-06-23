// permission
// @/router 当前在任何位置都好用
import router from '@/router'
// import {getUserInfo} from '@/api/login'
// import store from '@/store'
// 路由访问白名单 放有么有token都能访问的路由/页面
// 验证码 -> 后台请求 -> 后台通过网关 -> 1. 用户 2. 后台 c1
// 用户输入验证码 -> 提交 c2 -> 后台 c1 === c2
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
    // console.log(to, 'to');
    // console.log(from, 'from');

    // const token = localStorage.getItem('buka-cms-token');
    // const token = store.state.user.token;
    // // 设置路由白名单 无论任何情况都可以访问白名单中的路由
    // // token 可能有值, 可能没值
    // console.log(token, 'perm');
    // if (!token) {
    //     // 没登录
    //     // 不允许访问 回到登录页
    //     // /login 特殊 直接放行
    //     if (to.path === '/login') {
    //         next();
    //     } else {
    //         next(`/login?redirect=${to.path}`);
    //     }
    // } else {
    //     // 有token, 看下有没有用户信息
    //     // const userInfo = localStorage.getItem('buka-cms-user');
    //     const userInfo = store.state.user.user;
    //     if (userInfo) {
    //         // 有 直接过
    //         next();
    //     } else {
    //         // 通过token 重新获取用户信息
    //         // getUserInfo(token).then(response => {
    //         //     if (response.flag) {
    //         //         // 存储userInfo
    //         //         localStorage.setItem('buka-cms-user', JSON.stringify(response.data));
    //         //         next();
    //         //     } else {
    //         //         next({path:'/login'});
    //         //     }
    //         // });
    //         store.dispatch('GetUserInfo').then(response => {
    //             if (response.flag) {
    //                 next();
    //             } else {
    //                 next({ path: '/login?redirect=' + from.path });
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     }
    // }
    next({meta: from.path});
});