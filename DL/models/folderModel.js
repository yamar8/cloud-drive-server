const  mongoose = require ('mongoose');


const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "song",
    }],
    createDate: {
        type: Date,
        default: Date.now,
      },
    isActive:{
        type: Boolean,
        default: true
    }
});

const folderModel = mongoose.model("folder",folderSchema);


module.exports = {folderModel};