<template>
  <div>
    <div class="top">
      <el-page-header @back="goBack" content="音乐列表"> </el-page-header>
      <el-button size="mini" type="primary" @click="handleAdd">添加</el-button>
    </div>
    <el-table :data="musicList" style="margin-top: 1em">
      <el-table-column prop="name" label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.cover"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="singer" label="歌手"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="musicType" label="类型"> </el-table-column>
      <el-table-column prop="duration" label="时间"> </el-table-column>
      <el-table-column fixed="right" label="操作">
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
import request from "../../utils/request";
export default {
  data() {
    return {
      musicList: [],
    };
  },
  created() {
    this.getMusicList();
  },
  components: {},

  methods: {
    getMusicList() {
      request
        .get("/")
        .then((response) => {
          console.log(response);
          if(response.statusCode === 4000){
            this.$router.push('/login');
          }
          this.musicList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(row) {
      //   console.log(row);
      if (confirm("确认删除?")) {
        request.delete("/" + row._id).then((response) => {
          //   console.log(response);
          if (response.statusCode === 2000) {
            this.musicList = this.musicList.filter(
              (music) => music._id != response.data._id
            );
          }
        });
      }
    },
    handleEdit(row) {
      this.$router.push({path: '/music/edit', query: {id: row._id}});
    },
    handleAdd() {
      this.$router.push("/music/add");
    },
    goBack() {
      if (this.$route.path != this.backUrl) {
        this.$router.push(this.backUrl);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
