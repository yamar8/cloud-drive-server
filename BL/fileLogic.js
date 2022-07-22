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
  console.log('fold-', fold);
  if(fold) throw new Error("folder already exist");

  await fileController.create({name,dir,type: 'folder'});
  console.log('dir-',dir,'name-',name);
  if (!isExist(`./${dir}/${name}`)){
    fs.mkdirSync(`./${dir}/${name}`);
    console.log('folder has been created');
}
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
  //TODO check if a diractory isn't empty
  fileController.del(folder);
  const {dir,name} = folder;
  if(!isExist(`./${dir}/${name}`)) throw { message: "folder dosen't exist" };
  fs.rmdirSync((`./${dir}/${name}`));
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
