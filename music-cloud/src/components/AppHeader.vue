<template>
  <header>
    <div class="container">
      <div class="logo">
        <a href="/"> 云音乐 </a>
      </div>
      <div class="navbar">
        <ul class="nav">
          <li class="nav-item">
            <a href="/" class="nav-link">首页</a>
          </li>
          <li class="nav-item">
            <a href="/list" class="nav-link">发现音乐</a>
          </li>
          <li class="nav-item">
            <a href="/my" class="nav-link">我的音乐</a>
          </li>
          <li class="nav-item" style="display: flex;">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="search">
            </el-input>
            <el-button @click="handleSearch" style="margin-left: 5px;">搜索</el-button>
          </li>
          <li class="nav-item">
            <template v-if="user.username">
              欢迎: {{ user.username }} 
              <el-button type="text" @click="logout">注销</el-button>
            </template>
            <template v-else>
              <a href="#" class="nav-link" @click="handleLogin">登录</a>
              |
              <a href="#" class="nav-link" @click="handleRegister">注册</a>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import {getUser, removeUser} from '../utils/auth'
export default {
  data(){
    return {
      user: {
        username:'',
        password: ''
      },
      search: ''
    }
  },
  props: ["handleVisible", 'isLogin','handleRegisterVisible'],
  created(){
    // if(getUser()){
    //   this.user = getUser();
    // }
    // console.log(this.user);
  },  
  watch: {
    isLogin(){
      this.user = getUser();
    }
  },  
  mounted(){
    if(getUser()){
      this.user = getUser();
    }
  },
  methods: {
    handleSearch(){
      this.$router.push({
        path: '/list',
        query: {search: this.search},
      })
    },
    logout(){
      removeUser();
      this.user = {
        username:'',
        password: ''
      }
      window.location = '/?id=' + Math.random();
    },
    handleLogin() {
      this.handleVisible();
    },
    handleRegister() {
      this.handleRegisterVisible()
    },
  },
};
</script>
<style scoped lang="scss">
header {
  padding: 10px 0;
  background: #242424;
  position: fixed;
  width: 100%;
  a {
    color: #fff;
    &:hover {
      color: #ccc;
    }
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    color: #fff;
    text-shadow: 1px 1px 3px #f5c;
    font-size: 2em;
    a {
      color: #fff;
    }
  }
}
.nav {
  display: flex;
  align-items: center;
  margin: 0;
  &-item {
    margin: 0 1em;
    color: #fff;
  }
  &-link {
    padding: 0 5px;
    i {
      margin-right: 5px;
    }
  }
}
</style>
