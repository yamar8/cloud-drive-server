const express = require('express');
const router = express.Router();
const fileLogic = require("../BL/fileLogic");

const multer = require('multer');
const upload = multer();


router.post('/upload', upload.single('fileName'),async (req,res)=>{
  try{
    console.log("req.body - " + JSON.stringify(req.body));
    const dir = req.body.dir;
        fileLogic.saveFile(dir,req.file);
        fileLogic.newFile({name: req.file.originalname, dir:dir,type: 'file'})
      res.send("ok");
    }catch{
      res.status(400).json("error");
    }
  });

router.post("/read", async (req, res) => {
    try {
      const {name, dir} = req.body;
      const file = dir + '/' + name;
      console.log('file - ' , file);
      const data = await fileLogic.readFile(file);
      console.log(data);
      res.send(data);
    } catch (error) {
      res.send(error.message);
    }
  });
  
  router.post("/create",fileLogic.isValid,async (req, res) => {
      try {
          await fileLogic.createFile(req.body.fileName,req.body.value);
      res.send("file has been created");
    } catch (error) {
        res.send(error.message);
    }
  });
  
  router.put("/update", async (req, res) => {
    try {
      await fileLogic.updateFile(req.body.fileName, req.body.value);
      res.send("done");
    } catch(error) {
      res.send(error.message);
    }
  });
  
  router.delete("/deletefile", async (req, res) => {
    try {
      console.log(req.body.name,req.body.dir)
        await fileLogic.deleteFile(req.body);
        res.send("file has been deleted");
      } catch(error) {
      res.send(error.message);
    }
  });
  
  router.get('/', async (req, res) => {
    try{
        console.log("req.query: ", req.query);
        const item = await fileLogic.getFileByPath(req.query);
        res.send(item);
    }catch(error){
        res.status(error.code || 500).send({message: error.message || "Server Error"});
    }
  });

  router.post('/newfolder',async(req,res) => {
    try{
      await fileLogic.createFolder(req.body);
    }catch(error){
      res.send(error);
    }
  });

  router.delete('/deletefolder',async(req,res) => {
    try{
      fileLogic.deleteFolder(req.body);
    }catch(error){
      res.send(error.message);
    }
  })
  


module.exports = router;