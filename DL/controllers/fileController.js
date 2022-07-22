require('../db').connect();

const {fileModel} = require('../models/fileModel');

async function create(data){
    return await fileModel.create(data);
 }
 async function read(filter,proj){
    return await fileModel.find({...filter,isActive: true},proj);
 }
 async function readOne(filter,proj){
    return await fileModel.findOne({...filter,isActive: true},proj);
 }
 async function update(filter,newData){
    return await fileModel.updateOne({...filter,isActive: true}, newData);
 }
 async function del(filter){
  return fileModel.findOneAndUpdate({...filter,isActive: true}, {"$set":{"isActive":false}});
}
 module.exports = {create,read,update,del,readOne};



