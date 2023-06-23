<template>
  <div class="music">
    <el-page-header @back="goBack" content="音乐类型"> </el-page-header>
    <el-form
      class="music-add"
      ref="form"
      :model="musicType"
      label-width="120px"
    >
      <el-form-item label="音乐类型名称">
        <el-input v-model="musicType.name" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleAdd"
          size="small"
          :style="{ display: isEdit ? 'none' : 'inline-block' }"
          >添加</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="handleUpdate"
          :style="{ display: isEdit ? 'inline-block' : 'none' }"
          >编辑</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="musicTypeList">
      <el-table-column prop="name" label="类型名称"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column prop="update_time" label="更新时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Message } from "element-ui";
import request from "../../utils/request";
export default {
  name: "MusicAdd",
  data() {
    return {
      isEdit: false,
      musicType: {
        name: "",
      },
      musicTypeList: [],
    };
  },
  components: {},
  created() {
    this.getMusicTypeList();
  },
  methods: {
    getMusicTypeList() {
      request
        .get("/musicType")
        .then((response) => {
        //   console.log(response);
          this.musicTypeList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goBack() {
      if (this.$route.path != this.backUrl) {
        this.$router.push(this.backUrl);
      }
    },
    handleAdd() {
      request
        .post("/musicType", this.musicType)
        .then((response) => {
          if (response.statusCode === 2000) {
            Message({
              message: response.message,
              type: "success",
              duration: 5 * 1000, // 显示时长
            });
            this.musicType = {};
            this.musicTypeList.push(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(row) {
    //   console.log(row);
      if (confirm("确认删除?")) {
        request.delete("/musicType/" + row._id).then((response) => {
        //   console.log(response);
          if (response.statusCode === 2000) {
            this.musicTypeList = this.musicTypeList.filter(
              (musicType) => musicType._id != response.data._id
            );
          }
        });
      }
    },
    handleEdit(row) {
      request.get("/musicType/" + row._id).then((response) => {
        // console.log(response);
        if (response.statusCode === 2000) {
          this.musicType = response.data;
          this.isEdit = true;
        }
      });
    },
    handleUpdate(){
        request.put("/musicType", this.musicType).then((response) => {
        // console.log(response);
        if (response.statusCode === 2000) {
          this.getMusicTypeList();
          this.musicType ={}
          this.isEdit = false;
        }
      });
    }
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
</style>
