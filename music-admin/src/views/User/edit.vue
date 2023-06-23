<template>
  <div class="music">
    <el-page-header @back="goBack" content="用户编辑"> </el-page-header>
    <el-form class="music-add" ref="form" :model="user" label-width="80px">
      <!-- <el-form-item label="封面">
          <el-upload
            class="cover-uploader"
            :action="uploadsUrl"
            :http-request="uploadFile"
            :before-upload="beforeCoverUpload"
            :limit="1"
            name="file"
          >
            <img v-if="music.cover" :src="music.cover" class="cover" />
            <i v-else class="el-icon-plus cover-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      <el-form-item label="用户名">
        <el-input v-model="user.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleEdit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import request from "../../utils/request";
export default {
  name: "UserAdd",
  data() {
    return {
      user: { username: "", password: "", nickname: "" },
    };
  },
  created() {
    this.getUser();
  },
  components: {},

  methods: {
    goBack() {
      if (this.$route.path != this.backUrl) {
        this.$router.push(this.backUrl);
      }
    },
    getUser() {
      request
        .get("/user/" + this.$route.query.id)
        .then((response) => {
          console.log(response);
          if (response.statusCode === 2000) {
            this.user = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleEdit() {
      request
        .put("/user/" + this.$route.query.id, this.user)
        .then((response) => {
          if (response.statusCode === 2000) {
            this.music = { username: "", password: "", nickname: "" };
            this.$router.push("/user");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.backUrl = from.path;
    });
  },
};
</script>

<style lang="scss">
.el-form {
  margin-top: 1em;
}
.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.cover {
  display: block;
  width: 60px;
  height: 60px;
}
</style>
