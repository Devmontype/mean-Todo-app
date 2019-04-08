const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//create schema and models
const TodoSchema=new Schema({
    name:String,
    dt:String,
    time:String,
    complit:{
        dt:String,
        time:String
    }
});
const Todo=mongoose.model('Todos',TodoSchema);

module.exports=Todo;