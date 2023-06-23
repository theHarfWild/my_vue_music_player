<template>
  <div class="footer">
    <audio :src="music.url" controls ref="audio"></audio>
    <div class="container">
      <div class="playbar">
        <div class="btn">
          <div>
            <i class="bi bi-skip-start-circle" @click="prev"></i>
          </div>
          <div class="play">
            <i
              class="bi bi-play-circle"
              @click="play"
              v-if="playing == 'paused'"
            ></i>
            <i
              class="bi bi-pause-circle"
              @click="pause"
              v-if="playing === 'running'"
            ></i>
          </div>
          <div>
            <i class="bi bi-skip-end-circle" @click="next"></i>
          </div>
          <el-image
            :src="
              music.cover
                ? music.cover
                : 'http://localhost:3000/uploads/default-cover.png'
            "
            fit="cover"
            :style="{ 'animation-play-state': playing }"
          >
          </el-image>
        </div>
        <div class="slider">
          <div class="info" :title="music.name + ' ' + music.singer">
            <div class="info-content">
              {{ music.name }} <span class="small">{{ music.singer }}</span>
              <!-- {{ music.name }} <span class="small">{{ music.singer }}</span> -->
            </div>
          </div>
          <el-slider
            :show-tooltip="false"
            v-model="current"
            @change="handleSlider"
            :disabled="!isCanPlay"
          ></el-slider>
          <div class="play-time">
            <span>{{ currentTime }}</span> / <span>{{ music.duration }}</span>
          </div>
        </div>
        <div class="play-list" @click="showList">
          <i class="bi bi-music-note-list"></i>
        </div>
        <div class="play-list__content" v-if="isShow">
          <div class="list-title">
            <h4>播放列表({{ musicLength }})</h4>
          </div>
          <ul>
            <li
              :class="{ playing: index === playIndex }"
              v-for="(m, index) in musicList"
              @click="handleClickList(m._id)"
            >
              <div class="song">
                <i
                  :class="
                    index === playIndex
                      ? 'bi bi-play-fill f-red'
                      : 'bi bi-play-fill'
                  "
                ></i>
                {{ m.name }}
              </div>
              <div class="status">
                <span class="singer">{{ m.singer }}</span>
                <span class="duration">{{ m.duration }}</span>
                <span class="del" @click.stop="handleClick(m)"
                  ><i class="bi bi-trash3-fill"></i
                ></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../utils/request";
import event from '../utils/event'
import {getUser} from '../utils/auth'
export default {
  data() {
    return {
      playIndex: 0,
      music: {
        cover: "",
        url: "",
      },
      isShow: false,
      isCanPlay: false,
      musicList: [],
      audio: null,
      playing: "paused",
      currentTime: "00:00",
      current: 0,
    };
  },
  computed: {
    musicLength() {
      return this.musicList.length;
    },
  },
  watch: {
    playIndex(value) {
      this.music = this.musicList[value];
    },
  },
  created() {
    if(getUser()){
      this.getMusicList();
    }
    event.$on('getMusicLikeList', this.getMusicList)
    // console.log(this.audio);
  },
  mounted() {
    // if (this.musicLength) {
      this.audio = this.$refs.audio;
      this.audio.oncanplay = () => {
        this.isCanPlay = true;
      };
      const _this = this;
      this.audio.ontimeupdate = function () {
        // console.log(parseInt(this.currentTime / 60));
        _this.currentTime =
          parseInt(this.currentTime / 60)
            .toString()
            .padStart(2, "0") +
          ":" +
          (parseInt(this.currentTime) % 60).toString().padStart(2, "0");
        _this.current = Math.round((this.currentTime / this.duration) * 100);
        // console.log(_this.current);
      };
    // }
  },
  methods: {
    prev() {
      this.playIndex--;
      if (this.playIndex < 0) {
        this.playIndex = this.musicList.length - 1;
      }
    },
    next() {
      this.playIndex++;
      if (this.playIndex >= this.musicList.length) {
        this.playIndex = 0;
      }
    },
    handleSlider(v) {
      // console.log(v);
      // console.log();
      if (this.isCanPlay) {
        const current = (this.audio.duration * v) / 100;
        this.currentTime =
          parseInt(current / 60)
            .toString()
            .padStart(2, "0") +
          ":" +
          (parseInt(current) % 60).toString().padStart(2, "0");
        this.audio.currentTime = current;
      }
    },
    handleClickList(id) {
      this.playIndex = this.musicList.findIndex((music) => music._id === id);
      // console.dir(this.audio);

      if (this.playing === "running") {
        // console.dir(this.audio);
        this.audio.oncanplay = function () {
          this.play();
        };
      }
    },
    handleDelMusic(id) {
      console.log(id, "del");
      this.musicList = this.musicList.filter((music) => music._id !== id);
      this.playIndex = this.musicList.findIndex(
        (music) => music._id === this.music._id
      );
    },
    play() {
      // console.log(this.audio);
      if (this.isCanPlay) {
        this.audio.play();
        this.playing = "running";
      }
    },
    pause() {
      this.audio.pause();
      this.playing = "paused";
    },
    getMusicList() {
      request
        .get("/userLike")
        .then((response) => {
          if (response.data.length) {
            this.musicList = response.data;
            this.music = this.musicList[this.playIndex];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
   
    showList() {
      this.isShow = !this.isShow;
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
          this.getMusicList();
          event.$emit('getMusicLikeListMy')
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.footer {
  audio {
    display: none;
  }
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
    border-radius: 50%;
    animation: rotated 10s infinite linear;
  }
  .info {
    font-size: 14px;
    margin-right: 2em;
    width: 110px;
    overflow: hidden;
    white-space: nowrap;
    &-content {
      white-space: nowrap;
      display: flex;
      align-items: flex-end;
    }
    .small {
      font-size: 12px;
      color: #999;
      margin-left: 5px;
    }
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
      ul {
        padding: 0;
        li {
          padding: 0 1em;
          line-height: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          &:hover {
            background-color: #00000033;
            .song i {
              color: #f00;
            }
          }
        }
        li.playing {
          background: #00000099;
        }
      }
      position: absolute;
      width: 50%;
      padding: 1em 0;
      background-color: #333;
      color: #fff;
      right: 0;
      bottom: 62px;
      border: 4px solid #242424;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      font-size: 16px;
      h4 {
        margin: 0;
      }
      .duration {
        margin: 0 0.5em;
        font-size: 0.75em;
      }
      .singer {
        font-size: 0.75em;
      }
      .status {
        display: flex;
        align-items: center;
      }
      .del {
        &:hover {
          opacity: 0.7;
          cursor: pointer;
        }
      }
    }
  }
  .list-title {
    padding: 0 1em;
    padding-bottom: 1em;
    border-bottom: 2px solid #444;
  }
  .slider {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .el-slider {
    margin-right: 1em;
    flex: 1;
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
  .song {
    display: flex;
    i {
      color: #333;
    }
  }
}
@keyframes rotated {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
