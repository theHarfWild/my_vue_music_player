<template>
  <el-container>
    <el-header>
      <h3>云音乐后台</h3>
      <el-button type="text" @click="handleLogout">注销</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :default-active="$route.path"
        >
          <el-menu-item :index="null">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单</span>
          </el-menu-item>
          <el-submenu index="/music">
            <template slot="title">
              <i class="el-icon-headset"></i>
              <span>音乐管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/music">
                <i class="el-icon-document"></i>
                <span>音乐列表</span>
              </el-menu-item>
              <el-menu-item index="/music/add">
                <i class="el-icon-document-add"></i>
                <span>音乐添加</span>
              </el-menu-item>
              <el-menu-item index="/music/type">
                <i class="el-icon-document-copy"></i>
                <span>音乐类别</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/user">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user">
                <i class="el-icon-user"></i>
                <span>会员列表</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/user_add">
                <i class="el-icon-user"></i>
                <span>会员添加</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import request from "../../utils/request";
import { removeUser } from "../../utils/auth";
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    handleLogout() {
      removeUser();
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  height: 80px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #2d3a4b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-main {
  height: calc(100vh - 60px);
  overflow: auto;
}

.el-aside {
  background-color: #545c64;
  height: calc(100vh - 60px);
  color: #fff;
}
.el-menu {
  border-right: 0;
}
</style>
