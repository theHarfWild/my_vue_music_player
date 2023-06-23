<template>
  <div class="main">
    <div class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">我的音乐</div>
        <div v-for="music in musicLikeList" :key="music._id" class="text item">
          <div>
            {{ music.name }}
          </div>
          <div>
            {{ music.duration }}
            <span class="del" @click.stop="handleClick(music)"
              ><i class="bi bi-trash3-fill"></i
            ></span>
          </div>
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
      musicLikeList: [],
    };
  },
  async created() {
    if (getUser()) {
      await this.getMusicLikeList();
      this.musicLikeListId = this.musicLikeList.map((m) => m._id);
      console.log(this.musicLikeListId);
    } else {
      Message({
        message: "请先登录!",
        type: "error",
        duration: 5 * 1000, // 显示时长
      });
      setTimeout(()=>{
        this.$router.go(-1);
      }, 1000);
    }
    event.$on('getMusicLikeListMy',this.getMusicLikeList);
  },
  components: {},

  methods: {
    handleSearch() {},
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
          this.isLike = !this.isLike;
          this.getMusicLikeList();
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
