<template>
  <div class="music">
    <el-page-header @back="goBack" content="音乐添加"> </el-page-header>
    <el-form class="music-add" ref="form" :model="music" label-width="80px">
      <el-form-item label="封面">
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
      </el-form-item>
      <el-form-item label="音乐名称">
        <el-input v-model="music.name" required></el-input>
      </el-form-item>
      <el-form-item label="音乐类型">
        <el-select v-model="music.musicType" placeholder="请选音乐类型">
          <el-option
            v-for="mType in musicType"
            :key="mType._id"
            :label="mType.name"
            :value="mType.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="music.singer"></el-input>
      </el-form-item>
      <el-form-item label="音乐描述">
        <el-input
          type="textarea"
          v-model="music.description"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="音乐">
        <el-upload
          class="music-uploader"
          :limit="1"
          :action="uploadsMusicUrl"
          :http-request="uploadMusic"
          :before-upload="beforeMusicrUpload"
          name="music"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传MP3文件!</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd" :disabled="isDisabled"
          >添加</el-button
        >
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <audio
      :src="music.url"
      controls
      ref="audio"
      @canplay="canplay"
      style="display: none"
    ></audio>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  name: "MusicAdd",
  data() {
    return {
      uploadsUrl: "http://localhost:3000/api/uploads",
      uploadsMusicUrl: "http://localhost:3000/api/uploadsMusic",
      backUrl: "",
      music: {
        name: "",
        singer: "",
        description: "",
        cover: "",
        url: "",
        duration: "",
        musicType: "",
      },
      isDisabled: true,
      musicType: [],
    };
  },
  created() {
    request
      .get("/musicType")
      .then((response) => {
        this.musicType = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {},

  methods: {
    goBack() {
      if (this.$route.path != this.backUrl) {
        this.$router.push(this.backUrl);
      }
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
    uploadError(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    },
    uploadFile(file) {
      const fileObj = file.file;
      const form = new FormData();
      form.append("file", fileObj);
      request
        .post("/upload", form)
        .then((response) => {
          this.music.cover = response.url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadMusic(file) {
      const fileObj = file.file;
      const form = new FormData();
      form.append("music", fileObj);
      request
        .post("/uploadMusic", form)
        .then((response) => {
          this.music.url = response.url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    beforeCoverUpload(file) {
      console.log(file.type);
      const mime = [
        "image/gif",
        "image/png",
        "image/jpeg",
        "image/bmp",
        "image/webp",
      ];
      const isImage = mime.includes(file.type);

      if (!isImage) {
        this.$message.error("上传封面只能是 GIF,PNG,JPG,BMP,WEBP 格式!");
      }
      return isImage;
    },
    beforeMusicrUpload(file) {
      const isMusic = file.type === "audio/mpeg";

      if (!isMusic) {
        this.$message.error("上传音乐只能是 MP3 格式!");
      }
      return isMusic;
    },
    handleAdd() {
      request
        .post("/", this.music)
        .then((response) => {
          console.log(response);
          if (response.statusCode === 2000) {
            this.music = {
              name: "",
              singer: "",
              description: "",
              cover: "",
              url: "",
              duration: "",
              musicType: "",
            };
            this.$router.push('/music');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    canplay() {
      const duration = parseInt(this.$refs.audio.duration);
      this.music.duration = parseInt(duration / 60).toString().padStart('0', 2) + ":" + (duration % 60).toString().padStart('0', 2);
      this.isDisabled = !this.music.duration;
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
