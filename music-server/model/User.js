const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;
const userScheam = new Schema(
    {
        username:{
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true
        },
        likes: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: {
            createdAt: "create_time",
            updatedAt: "update_time",
        },
    }
);

userScheam.plugin(mongoosePaginate);
// Schema -> Model
const User = mongoose.model("user", userScheam);

//导出模型
module.exports = User;