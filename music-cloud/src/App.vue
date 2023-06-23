<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import request from "./utils/request";
import { Message } from "element-ui";
import { setUser } from "./utils/auth";
import event from './utils/event'
export default {
  data() {
    return {
      isVisible: false,
      isRegisterVisible: false,
      user: {
        username: "",
        password: "",
        nickname: "",
      },
      isLogin: false,
    };
  },
  methods: {
    handleVisible() {
      this.isVisible = true;
    },
    handleRegisterVisible() {
      this.isRegisterVisible = true;
    },
    handleLogin() {
      request.post("/login", this.user).then((response) => {
        // console.log(response);
        if (response.statusCode === 4000) {
          Message({
            message: response.message,
            type: "error",
            duration: 5 * 1000, // 显示时长
          });
          return false;
        }
        Message({
          message: response.message,
          type: "success",
          duration: 5 * 1000, // 显示时长
        });
        this.isVisible = false;
        this.isLogin = true;
        setUser(response.data);
        // this.$router.push('/?' + Math.random());
        // event.$emit('handleLike');
        window.location = '/?id=' + Math.random();
      });
    },
    handleRegister() {
      request
        .post("/userAdd", this.user)
        .then((response) => {
          console.log(response);
          if (response.statusCode === 4000) {
            Message({
              message: response.message,
              type: "error",
              duration: 5 * 1000, // 显示时长
            });
            return false;
          }
          if (response.statusCode === 2000) {
            this.music = { username: "", password: "", nickname: "" };
            this.isRegisterVisible = false;
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <div id="app">
    <app-header
      :handleVisible="handleVisible"
      :handleRegisterVisible="handleRegisterVisible"
      :isLogin="isLogin"
    ></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
    <el-dialog title="登录" :visible.sync="isVisible" width="30%" center>
      <el-form label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="注册"
      :visible.sync="isRegisterVisible"
      width="30%"
      center
    >
      <el-form label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to bottom, #333, #242424, #333);
  padding: 15px 0;
  font-size: 1.5em;
  color: #fff;
  .el-image {
    width: 36px;
    height: 36px;
    border-radius: 4px;
  }
  .playbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .play {
    font-size: 1.5em;
  }
  .play-time {
    font-size: 12px;
    white-space: nowrap;
  }
  .play-list {
    margin: 0 1em;
    &__content {
      position: absolute;
      width: 50%;
      padding: 1em;
      background-color: #333;
      color: #fff;
      right: 0;
      bottom: 62px;
      border: 4px solid #242424;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
    }
  }
  .slider {
    flex: 1;
    margin: 0 1em;
    display: flex;
    align-items: center;
  }
  .el-slider {
    margin-right: 1em;
  }
  .btn {
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      margin: 0 0.25em;
    }
  }
}
</style>
