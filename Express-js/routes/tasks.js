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
router.post('/',(req,res)=>{
    const newTask = {
        id:req.body.id,
        task:req.body.task,
        status: req.body.status
    }

    fs.readFile('./routes/task.json',(err,data)=>{
      if(err){
         return res.status(404).json({message:'File not found'})
      }
      const tasks = JSON.parse(data);
      tasks.push(newTask);

      fs.writeFile('./routes/task.json',JSON.stringify(tasks,2,null),(err)=>{
        if(err) return res.status(404).json({message:'file not found'})
           res.status(200).json({message:'task added successfully',tasks}) 
      })
     
    })
})

//PUT
router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const updatedTask = req.body;
    fs.readFile('./routes/task.json',(err,data)=>{
        if(err) return res.status(404).json({message:'file not found'})
        const tasks = JSON.parse(data);
         const index = tasks.findIndex(t=>t.id === id);

         tasks[index] = {...tasks[index],...updatedTask};

         fs.writeFile('./routes/task.json',JSON.stringify(tasks,null,2),(err)=>{
            if(err) return res.status(404).json({message:'File not found'});
            res.status(200).json({message:'task updted successfully',tasks})
         })
    })
})

//Delete
router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    fs.readFile('./routes/task.json',(err,data)=>{
        if(err) return res.status(404).json({message:'file not found'});

        const tasks = JSON.parse(data);

        const index = tasks.findIndex(t=>t.id === id);

        tasks.splice(index,1);

        fs.writeFile('./routes/task.json',JSON.stringify(tasks,null,2),(err)=>{
            if(err) return res.status(404).json({message:'File not found'});
            res.status(200).json({message:'Task deleted',tasks})
        })
    })
})


export default router;