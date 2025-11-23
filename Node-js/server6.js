import fs from "fs";
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
        else{
             res.writeHead(200,{'Content-Type':'application/json'});
            res.end(data)
        }
      })
   }

   //GET BY ID
   
   else if (req.url.startsWith('/api/tasks/') && req.method === 'GET'){
       const id = parseInt(req.url.split('/')[3]);

       fs.readFile('./task.json','utf-8',(err,data)=>{
            if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
            }
            const tasks = JSON.parse(data);
            const task = tasks.find(t=>t.id === id);

            if(!task){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task not found'}))
            }

            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(task))
       })
   }

   //Post taskk

   else if(req.url === '/api/tasks' && req.method === 'POST'){
    let body = '';

    req.on('data',(chunk)=>{
        body +=chunk.toString();
    })

    req.on('end',()=>{
        let newTask = JSON.parse(body);

        fs.readFile('./task.json','utf-8',(err,data)=>{
            if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
            }

            let tasks = JSON.parse(data)
            tasks.push(newTask)

              fs.writeFile('./task.json',JSON.stringify(tasks,null,2),(err)=>{
            if(err){
             res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
            }

            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task added successfully',tasks}))
        })
        })

      
    })
   }

   // PUT
   else if(req.url.startsWith('/api/tasks/')&& req.method === 'PUT'){
      const id = parseInt(req.url.split('/')[3]);

      let body=''
      req.on('data',(chunk)=>{
         body +=chunk.toString();
      })

      req.on('end',()=>{
        let updatedTask = JSON.parse(body);
        
        
      fs.readFile('./task.json',(err,data)=>{
       
        if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
        }
        let tasks = JSON.parse(data)
        const index = tasks.findIndex(t=>t.id === id);

        if(index ===  -1){
            es.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task not found'}))
        }

        tasks[index] = {...tasks[index],...updatedTask};

        fs.writeFile('./task.json',JSON.stringify(tasks,null,2),(err)=>{
            if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
            }

            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task updated',tasks}))
        })


        
      })
        

      })

   }


   //DELETE
   else if(req.url.startsWith('/api/tasks/') && req.method === 'DELETE'){
      const id = parseInt(req.url.split('/')[3]);

      fs.readFile('./task.json','utf-8',(err,data)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'file not found'}))
        }

        let tasks = JSON.parse(data);
        let index = tasks.findIndex(t=>t.id === id);

        if(index === -1){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task not found'})) 
        }

        tasks.splice(index,1);

        fs.writeFile('./task.json',JSON.stringify(tasks,null,2),(err)=>{
             res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'task deleted',tasks}))
        })
      })
   }


})


server.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`)
})