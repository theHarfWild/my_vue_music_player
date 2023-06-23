const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const musicTypeScheam = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "create_time",
            updatedAt: "update_time",
        },
    }
);

// Schema -> Model
const MusicType = mongoose.model("musicType", musicTypeScheam);

//导出模型
module.exports = MusicType;