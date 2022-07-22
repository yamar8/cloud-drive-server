require('../DL/db.js').connect();
const fs = require("fs");

const folderController = require('../DL/controllers/folderController');
// const fileController = require('../DL/controllers/fileController');


const createFolder = async (folder) => {
        const {path,name} = folder;
        fs.mkdirSync(`./${path}/${name}`);
}




const getAllfolders = async () => {
   return await playlistController.read({});
}

module.exports = {getAllfolders,createFolder};