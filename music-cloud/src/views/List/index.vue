<template>
  <div class="main">
    <div class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-input
            placeholder="请输入搜索内容"
            v-model="search"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </div>
        <div
          v-for="music in musicList"
          :key="music._id"
          class="text item"
          @click="handleClick(music)"
        >
          <div>
            <i class="el-icon-star-off" v-if="!musicLikeListId.includes(music._id)"></i>
            <i class="el-icon-star-on f-red" v-else></i>
            {{ music.name }}
          </div>
          {{ music.duration }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import { getUser } from "../../utils/auth";
import { Message } from "element-ui";
import event from "../../utils/event";
export default {
  data() {
    return {
      search: "",
      musicList: [],
      musicLikeList: [],
      musicLikeListId: [],
      isLike: false,
    };
  },
  async created() {
    const search = this.$route.query.search;
    console.log(this.$route.query);
    this.getMusicList(search);
    if (getUser()) {
      await this.getMusicLikeList();
      this.musicLikeListId = this.musicLikeList.map((m) => m._id);
      console.log(this.musicLikeListId);
    }
  },
  components: {},

  methods: {
    handleSearch() {
        this.getMusicList(this.search)
    },
    getMusicList(search) {
        console.log(search);
      request
        .get("/musicList", {params: {search}})
        .then((response) => {
          this.musicList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMusicLikeList() {
      return request
        .get("/userLike")
        .then((response) => {
          if (response.data.length) {
            this.musicLikeList = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClick(music) {
      if (!getUser()) {
        Message({
          message: "请先登录!",
          type: "error",
          duration: 5 * 1000, // 显示时长
        });
        return;
      }

      request.put("/addLike", { music }).then((response) => {
        console.log(response);
        if (response.statusCode === 2000) {
          event.$emit("getMusicLikeList");
        //   this.isLike = !this.isLike;
          window.location = '/list?id=' + Math.random();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  line-height: 2;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 1em;

  &:hover {
    background: #00000033;
  }
}
</style>
