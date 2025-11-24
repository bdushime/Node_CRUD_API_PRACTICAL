import fs from 'fs'

import http from 'http'

const PORT = 9000;

//Middleware
function logger(req,res){
 console.log(`${req.method} ${req.url} --${new Date().toISOString()}`)
}

function  jsonMiddlewware(req,res){
    if((req.method === 'POST' || req.method === 'PUT')&& 
    req.headers['Content-Type'] !== 'application/json'){
       res.writeHead(400,{'Content-Type':'application/json'});
       res.end(JSON.stringify({message:'Content-Type must be application/json'}));
       return false;
    }
    return true;
}


const server = http.createServer((req,res)=>{

    logger(req,res);
    if(!jsonMiddlewware(req,res))return;

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
            res.end(JSON.stringify({message:'task added',tasks}))    
             
        })
      
     })
        }) 


   
   } 

   //PUT
   else if(req.url.startsWith('/api/tasks/') && req.method==='PUT'){
    const id = parseInt(req.url.split('/')[3]);
    let body='';
    req.on('data',(chunk)=>{
        body +=chunk.toString();
    })

    req.on('end',()=>{
        let newTask = JSON.parse(body);
        fs.readFile('./task.json',(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'file not found'}))
            }
            let tasks = JSON.parse(data);

            let index=tasks.findIndex(t=>t.id === id);

            if(index === -1){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'task not found'}))
            }

            tasks[index] = {...tasks[index],...newTask};

            fs.writeFile('./task.json',JSON.stringify(tasks,null,2),(err)=>{
                if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'failed to add task'}))
                }
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'task ',tasks}))
            })
        }) 
         
    })
   }

   //DELETE
   else if(req.url.startsWith('/api/tasks/') && req.method === 'DELETE'){
     let id = parseInt(req.url.split('/')[3]);

     fs.readFile('./task.json',(err,data)=>{
         if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
         }
         let tasks = JSON.parse(data);
         let index = tasks.findIndex(t=>t.id=== id);

         if(index === -1){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task not found'}))
         }

         tasks.splice(index,1);

         fs.writeFile('./task.json',JSON.stringify(tasks,null,2),(err)=>{
            if(err){
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'task not deleted'}))
            }
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task deleted',tasks}))
         })
     })
   }

   //GET BY ID

   else if(req.url.startsWith('/api/tasks/') && req.method === 'GET'){
    const id = parseInt(req.url.split('/')[3]);
    fs.readFile('./task.json',(err,data)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
        }
      
        let tasks = JSON.parse(data);

        let task = tasks.find(t=>t.id === id);

        if(!task){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task not found'}))
        }
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'task found',task}))
        
    })
   }

      
})


server.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`)
})
