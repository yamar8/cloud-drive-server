const  mongoose = require ('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    dir:{
        type: String,
        require: true
    },
    createDate: {
        type: Date,
        default: Date.now,
      },
    isActive:{
        type: Boolean,
        default: true
    },
    type:{
        type: String,
        enum: ["file", "folder"],
    }
});


const fileModel = mongoose.model("file",fileSchema);


module.exports = {fileModel};