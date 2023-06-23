<template>
  <div class="main">
    <div class="recommend">
      <div class="container">
        <div class="title">
          <h2><i class="bi bi-record-circle-fill"></i>热门推荐</h2>
          <div class="tags">
            <a :href="'/music/'+t.name" style="cursor: pointer;" v-for="t in musicTypeList" :key="t._id" @click="findByType(t.name)" :class="{active: $route.params.typeName===t.name}">{{t.name}}</a>
          </div>
        </div>
        <div class="items">
          <div class="item" v-for="music in musicRecommend">
            <MusicCard :music="music" :musicList="musicList"></MusicCard>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="container">
        <div class="title">
          <h2><i class="bi bi-record-circle-fill"></i>最新歌曲</h2>
        </div>
        <div class="items">
          <div class="item" v-for="music in musicNew">
            <MusicCard :music="music" :musicList="musicList"></MusicCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../utils/request";
import MusicCard from "../../components/MusicCard";
import {getUser} from '../../utils/auth'
import event from '../../utils/event'
export default {
  data() {
    return {
      musicRecommend: [],
      musicNew: [],
      musicTypeList: [],
      musicList: []
    };
  },
  async created() {
    if(getUser()){
      await this.getMusicList();
    }
    this.getMusicRecommend(this.$route.params.typeName);
    this.getMusicNew();
    this.getMusicTypeList();
    
  },
  methods: {
    getMusicList() {
      request
        .get("/userLike")
        .then((response) => {
          if (response.data.length) {
            this.musicList = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findByType(typeName){
      this.getMusicRecommend(typeName);
    },
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
    getMusicRecommend(typeName) {
      request.get("/music/recommend", {params:{typeName}}).then((response) => {
        // console.log(response);
        this.musicRecommend = response.data;
      });
    },
    getMusicNew() {
      request.get("/music/new").then((response) => {
        // console.log(response);
        this.musicNew = response.data;
      });
    },
  },
  components: {
    MusicCard,
  },
};
</script>
<style scoped lang="scss">
.recommend {
  .tags{
    a.active{
      color: #409eff;
    }
  }
  .items {
    margin-top: 2em;
  }
  .play-btn {
    // background: #409eff;
    color: #fff;
    border-radius: 50%;
    padding: 3px;
    text-align: center;
    i {
      display: block;
      background: #409eff;
      border-radius: 50%;
      border: 1px solid #409eff;
      width: 1em;
      height: 1em;
      &::before {
        display: block;
        width: 1em;
        height: 1em;
      }
    }
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
