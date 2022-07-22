require('../db').connect();

const {folderModel} = require('../models/folderModel');

async function create(data){
   const a =  await folderModel.create(data);
   return a;
 }
 async function read(filter,proj){
    return await folderModel.find(filter,proj).populate({path: 'files',select:['name']} );
 }
 async function readOne(filter,proj){
    return await folderModel.findOne(filter,proj);
 }
 async function update(filter,newData){
    const a =  await folderModel.updateOne(filter, newData);
    return a;
 }
 async function del(filter){
    return await update(filter,{"$set":{"isActive":false}});
 }
 
 module.exports = {create,read,update,del,readOne};



