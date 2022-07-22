const express = require('express');
const folderLogic = require("../BL/folderLogic");
const router = express.Router();
const multer = require('multer');
const upload = multer();


router.post('/',async(req,res) => {
    const folder = {name: "screen", path: "uploads/cool"}
   await folderLogic.createFolder(folder);
    res.send("success");
});




router.get('/', async (req, res) => {
    const folders = await folderLogic.getAllfolders();
    res.send(folders);
});


module.exports = router;

