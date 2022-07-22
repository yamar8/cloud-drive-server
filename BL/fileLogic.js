require("../DL/db.js").connect();
const fileController = require("../DL/controllers/fileController");
const fs = require("fs");

/*fs function */

function saveFile(dir, file) {
  fs.writeFileSync(`./${dir}/` + file.originalname, file.buffer);
}

const createFile = (fileName, value) => {
  if (isExist(fileName)) throw { message: "file is already exist" };
  fs.writeFileSync(`uploads/${fileName}`, value);
};

const readFile = async (path) => {
  console.log("path - ", path);
  if (!isExist(path)) throw { message: "File dosen't exist" };
  const data = await fs.readFileSync(path, {
    encoding: "utf-8",
  });
  return data;
};
const updateFile = (fileName, value) => {
  if (!isExist(fileName)) throw { message: "file dosen't exist" };
  fs.appendFileSync(`uploads/${fileName}`, value);
};

const deleteFile = (file) => {
  
  fileController.del(file);
  const {name, dir} = file;

  if (!isExist) throw { message: "File dosen't exist" };
  fs.unlinkSync(`uploads/${name}`);
};

const createFolder = async (folder) =>{
  const {name,dir} = folder;
  if (!name || !dir) throw { code: 405, message: "missing data" };
  
  const fold = await fileController.readOne({name,dir,type: 'folder'});
  if(fold) throw new Error("folder already exist");

  console.log('dir-',dir,'name-',name);
  if (!isExist(`./${dir}/${name}`)){
    fs.mkdirSync(`./${dir}/${name}`);
    console.log('folder has been created');
  }
  const newfolder =  await fileController.create({name,dir,type: 'folder'});
  newfolder = newfolder.toJson();
  return newfolder;
}

 function isExist(path) {
  console.log("--------");
  return fs.existsSync(path);
}

const isValid = (req, res, next) => {
  const { fileName } = req.body;
  if (isValidName(fileName) && isValidExtantions(fileName)) {
    next();
  } else {
    res.send("file is not valid");
  }
};

/*DB function */

const newFile = async (file) => {
  if (!file) throw { code: 405, message: "missing data" };
  const newFile = await fileController.create(file);
  console.log("file has been created: ", newFile);
};

const getAllFiles = async () => {
  return await fileController.read({});
};

const getFileByPath = async (path) => {
  return await fileController.read(path);
};

const deleteFolder = async(folder) => {
  try{
    const {dir,name} = folder;
    console.log(":::",dir,name);
    if(!dir || !name) throw new Error("missing data");
    //TODO check if a diractory isn't empty
    if(!fs.existsSync(`./${dir}/${name}`)) throw { message: "folder dosen't exist" };
    fs.rmdirSync((`./${dir}/${name}`));
    return fileController.del({name: name, dir: dir});
  }catch(error){
    console.log(error.message);
  }
}

module.exports = {
  deleteFile,
  updateFile,
  readFile,
  createFile,
  getAllFiles,
  newFile,
  isValid,
  saveFile,
  getFileByPath,
  createFolder,
  deleteFolder
};
