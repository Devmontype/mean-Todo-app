const express=require('express');
const router=express.Router();

const Todo=require('./model');

const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/testaroo',{useNewUrlParser:true});

mongoose.connection.once('open',function(){
        console.log('connection made with mongo db');
        }).on('error',function(error){
    console.log('connection error',error);
        });

router.get('/',(req,res)=>{
    res.send('Welcome');
});
router.post('/addTodo',(req,res)=>{

    let todo=new Todo({
        name:req.body.item,
        dt:req.body.dt,
        time:req.body.time,
        complit:{
            dt:'not yet complited',
            time:'not yet complited'
           
        }
    });
    todo.save().then(function(){
        res.json('item added');
    })
});
router.get('/getTodo',(req,res)=>{
      
    Todo.find({complit:{
    dt:'not yet complited',
    time:'not yet complited'
   }}).then(function(results){
       res.json(results);
   });

});
router.get('/del/:item',(req,res)=>{

    var AmPm=new Date().getHours()>=12?'pm':'am';
    var currentTime=new Date().getHours()+':'+new Date().getMinutes()+':'+AmPm;
    var currentDate=new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();

    console.log(req.params.item);
    mongoose.set('useFindAndModify', false);
    Todo.findOneAndUpdate({_id:req.params.item},{complit:{
        dt:currentDate,time:currentTime}
        }).then(function(){
            res.json('todo recived for removal');
        });

});

router.get('/complitTask',(req,res)=>{
    
    Todo.find({complit:{$ne:{
        dt:'not yet complited',
        time:'not yet complited'}
       }}).then(function(results){
           res.json(results);
       });

});
router.get('/delComplitTask/:id',(req,res)=>{
    
    Todo.findOneAndRemove({_id:req.params.id}).then(function(){
        res.json('Task deleted');
    });

})
module.exports=router;
