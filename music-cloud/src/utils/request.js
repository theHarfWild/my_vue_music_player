import axios from "axios";
// 单独使用组件 按需加载
import { Loading, Message } from 'element-ui'
import {getUser} from './auth'
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = '/api';
//
// console.log(BASE_URL);
// 定义加载效果, 加载数据时打开关闭效果
// 单例模式
const loading = {
    loadingInstance: null, // Loading 实例 单例对象
    open() { // 开启loading
        // console.log('加载中', this.loadingInstance);
        if (this.loadingInstance === null) { // 没创建过 Loading 实例对象  切换路由
            // console.log('创建Loading 实例对象');
            this.loadingInstance = Loading.service({
                text: '拼命加载中...',
                target: '.el-main', // loading显示区域
                background: 'rgba(0, 0, 0, 0.5)', // 遮罩层的背景 半透明
            });
        }
    },
    closeLoading() { // 关闭loading
        //  有loading实例对象 关闭这个对象
        if (this.loadingInstance !== null) {
            this.loadingInstance.close(); // loading 关闭loading
            // console.log('加载结束');
        }
        this.loadingInstance = null// 关闭之后代表当前这一套操作完事了, 下次需要重新创建新的实例 当前实例 置空
    }
}


// axios 发送请求 全局的配置
const request = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // 请求超时 时限 抛出错误
});

// 可以配置请求拦截
request.interceptors.request.use(
    (config) => {
        let _id = null;
        if (getUser()) {
            ({ _id } = getUser());
        }
        config.params = {...config.params, _id }
        loading.open();
        return config;
    },
    (error) => {
        loading.closeLoading();
        return Promise.reject(error);
    }
);
// 可以配置响应拦截
request.interceptors.response.use(
    (response) => {
        // 响应成功 关闭loading
        const responseData = response.data;
        // 后台响应会有一套
        // console.log(responseData.statusCode);
       
        loading.closeLoading();
        return responseData;
    },
    (error) => {
        // 响应失败 关闭loading
        loading.closeLoading();
        // 系统的状态码 404 500
        // console.log('response', error.response.status);
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000, // 显示时长
        });
        // 不处理不会抛出错误
        return Promise.reject(error);
    }
);

// 需要使用的文件中引入request 直接获取全局配置
export default request;
