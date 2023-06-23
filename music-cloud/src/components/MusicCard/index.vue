<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="music.cover" class="image" />
    <div style="padding: 14px">
      <h4 @click="handleLike(music)">
        {{ music.name }}
        <i class="el-icon-star-off" v-if="!isLike"></i>
        <i class="el-icon-star-on f-red" v-if="isLike"></i>
      </h4>
      <p>
        {{ music.description }}
      </p>
      <div class="bottom">
        <a href="#">{{ music.singer }}</a>
        <!-- <div class="play-btn" @click="handlePlay">
          <i class="bi bi-play-circle"></i>
        </div> -->
      </div>
    </div>
  </el-card>
</template>

<script>
import { getUser } from "../../utils/auth";
import { Message } from "element-ui";
import request from "../../utils/request";
import event from "../../utils/event";
export default {
  data() {
    return {
      isLike: false,
      isLogin: false,
    };
  },
  props: {
    music: {
      default: {},
    },
    musicList: {
      default: [],
    },
  },
  created() {
      // console.log(this.musicList);
      this.musicList.forEach((m) => {
      if (m._id === this.music._id) {
        this.isLike = true;
        return false;
      }
    });
    event.$on('handleLike', this.handleLike);
   
  },
  methods: {
    setLogin(){
      console.log(123123);
      this.isLogin = true;
    },
    handleLike(music) {
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
          this.isLike = !this.isLike;
        }
      });
    },
    handlePlay() {},
  },
  components: {},
};
</script>

<style scoped lang="scss">
h4 {
  i {
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
