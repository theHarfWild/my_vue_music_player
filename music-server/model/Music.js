const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.connect("mongodb://localhost/music-cloud");

const Schema = mongoose.Schema;
const musicScheam = new Schema(
    {
        url:{
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        singer: {
            type: String,
            required: true,
            default: '佚名'
        },
        description:{
            type: String,
        },
        cover: {
            type: String,
            default: 'http://localhost:3000/uploads/default-cover.png'
        },
        musicType: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            default: '00:00'
        }
    },
    {
        timestamps: {
            createdAt: "create_time",
            updatedAt: "update_time",
        },
    }
);

musicScheam.plugin(mongoosePaginate);
// Schema -> Model
const Music = mongoose.model("Music", musicScheam);

//导出模型
module.exports = Music;