import fs from 'fs'

import http from 'http'

const PORT = 9000;


const server = http.createServer((req,res)=>{
   //GET
  if(req.url === '/api/tasks' && req.method === 'GET'){
     
    fs.readFile('./task.json','utf-8',(err,data)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
        }
        else {
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(data)
        }
    })
      
  }


   //POST

   else if(req.url.startsWith('/api/tasks') && req.method === 'POST'){
     const id = parseInt(req.url.split('/')[3]);
     let body='';

      req.on('data',(chunk)=>{
            body +=chunk.toString();   
        })


       req.on('end',()=>{
            let task = JSON.parse(body);

        fs.readFile('./task.json','utf-8',(err,data)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
        }

        let tasks = JSON.parse(data);
        tasks.push(task);
         
        fs.writeFile('./task.json',JSON.stringify(tasks,null,2),(err)=>{
             if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
             }
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task added'},tasks))    
             
        })
      
     })
        }) 


   
   } 


      
})


server.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`)
})
