import express from 'express'
import fs from 'fs'

const router = express.Router();




//Get all tasks
router.get('/',(req,res)=>{
    fs.readFile('./tasks.js',(err,data)=>{
      if(err) return res.status(404).json({message:'File not found'});
      const tasks = JSON.parse(data);
      res.status(200).json({message:'Tasks retrieved successfully',tasks})
    })
})


export default router;