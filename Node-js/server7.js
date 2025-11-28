import http from 'http'
import fs from 'fs'

const PORT = 9001;


const server = http.createServer((req,res)=>{
    if(req.url === '/api/fab' && req.method=== 'GET'){
        fs.readFile('./input.json','utf-8',(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Error reading file'}))
            } 

            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(data);

        })
    }

    else if(req.url.match('/api/fab') && req.method==='POST'){
        let body='';

        req.on('data',(chunk)=>{
           body +=chunk.toString();
        })

        req.on('end',()=>{
            let newTask = JSON.parse(body);

            fs.readFile('./input.json',(err,data)=>{
                if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Error reading file'}))
            } 
            
            const tasks = JSON.parse(data);

            tasks.push(newTask);
            
             fs.writeFile('./output.json',JSON.stringify(tasks,null,2),(err)=>{
                if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Error writing to file'}))
                }
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Task added successfully',tasks}));
             })
            })
        })

    }

    
    
})


server.listen(PORT,()=>{
        console.log(`Sever listening at port: ${PORT}`);
    })