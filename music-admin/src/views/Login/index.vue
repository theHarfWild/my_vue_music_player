<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import request from "../../utils/request";
import { Message } from "element-ui";
import { setUser } from "../../utils/auth";
export default {
  name: "Loing",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  components: {},

  methods: {
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
        setUser(response.data)
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 540px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
