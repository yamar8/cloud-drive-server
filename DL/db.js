//Import the mongoose module
const  mongoose = require ('mongoose');

const MONGO_URL = process.env.MONGO_URL;

//Set up default mongoose connection
exports.connect = async()=>{
    try{
        await mongoose.connect(MONGO_URL, {useNewUrlParser:true},
            (err)=>{
                if(err){throw err}
                console.log("Connection Success",mongoose.connection.readyState);
            })
    }
    catch(e){
        console.log('error mongoose:',e);
    }
}