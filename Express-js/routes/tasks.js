import express from 'express'
import fs from 'fs'

const router = express.Router();




//Get all tasks
router.get('/',(req,res)=>{
    fs.readFile('./routes/task.json',(err,data)=>{
      if(err) return res.status(404).json({message:'File not found'});
      const tasks = JSON.parse(data);
      res.status(200).json({message:'Tasks retrieved successfully',tasks})
    })
})

//Get tasks by id
router.get('/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    fs.readFile('./routes/task.json',(err,data)=>{
        if(err) return res.status(404).json({message:'File not found'})
            const tasks = JSON.parse(data);
            const task = tasks.find(t=>t.id === id);
       res.status(200).json({message:`task with ${id} found`,task})      
    })
})

//POST 
router.post('./routes/task.json',(err,data)=>{
    const newTask = re
})


export default router;