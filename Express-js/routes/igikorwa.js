import express from 'express'
import fs, { createReadStream } from 'fs'
const router = express.Router();


router.use((req,res,next)=>{
    let start = new Date().getTime();

    console.log(` needed  method: ${req.method} --url: ${req.url}`);

    next();

})


// router.get('/',(req,res)=>{ 
//     fs.readFile('./routes/task.json',(err,data)=>{
//         if(err){
//             return res.status(404).json({message:'File not found'})
//         }
//         const tasks= JSON.parse(data);
//         res.status(200).json({message:'Successfully',tasks})
//     })
// })

 router.get('/',(req,res)=>{
    const stream = fs.createReadStream('./routes/task.json','utf-8');
    
    let data=''

    stream.on('data',(chunk)=>{
       data +=chunk
    })

    stream.on('end',()=>{
        const tasks = JSON.parse(data);
        res.status(200).json({message:'Task retreived',tasks})
    })

 })


 router.post('/',(req,res)=>{
    const newTask = {
        id:req.body.id,
        task:req.body.task,
        status: req.body.status
    }

    fs.readFile('./routes/task.json','utf-8',(err,data)=>{
        if(err){
            res.status(200).json({message:'file not found'})
        }

        const tasks = JSON.parse(data);
        tasks.push(newTask);

        const writeStream = fs.createReadStream('./routes/task.json');

        writeStream.write(JSON.stringify(tasks,null,2));

        writeStream.on('finish',()=>{
           res.status(200).json({message:'task added successfully',tasks});
        })
    })

 })


router.post('/',(req,res)=>{
    const newTask = {
        id:req.body.id,
        task: req.body.task,
        status: req.body.status

    }

    fs.readFile('./routes/task.json',(err,data)=>{
        if(err){
            res.status(404).json({message:'error reading file'})
        }

        const tasks = JSON.parse(data);
        tasks.push(newTask);

        fs.writeFile('./routes/task.json',JSON.stringify(tasks,null,2),(err)=>{
            if(err){
                res.status(404).json({message:'error writing file'})
            }
            res.status(200).json({message:'file added',tasks});
        })
    })

})



export default router;


