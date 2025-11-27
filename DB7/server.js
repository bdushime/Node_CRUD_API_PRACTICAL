import http from 'http'
import fs from 'fs'

const Port = 8004;


const server = http.createServer((req,res)=>{

    //GET 
    if(req.url === '/api/task' && req.method === 'GET'){
        fs.readFile("./input.txt",(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/txt'})
                res.end({message: 'File not found'})
            }

            res.writeHead(200,{'Content-Type':'application/txt'});
            res.end(data);
        })
        
    }

    //POST

    if(req.url === '/api/task'&& req.method === 'POST'){
        let body ='';

        req.on('data',(chunk)=>{
            body +=chunk.toString();
        })

        req.on('end',()=>{
            let task = body;

        // fs.readFile("./input.txt",(err,data)=>{
        //     if(err){
        //         res.writeHead(404,{'Content-Type':'application/txt'})
        //         res.end({message: 'File not found'})
        //     }

        //     let tasks = String(data);

        //     tasks.appendFile(task);
        //     // console.log(tasks);

        //     fs.writeFile("./output.txt",tasks,(err)=>{
        //         if(err){
        //              res.writeHead(404,{'Content-Type':'application/txt'})
        //         res.end({message: 'File not writable'})
        //         }

        //         res.writeHead(200,{'Content-Type':'application/txt'})
        //         res.end({message: 'File written',tasks})
        //     })
        // })

          fs.writeFile("./output.txt",task,(err)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/txt'})
                
            }


            res.writeHead(200,{'Content-Type':'application/txt'});
            res.end(task);
          })
        
        })
    }
})


server.listen(Port,()=>{
    console.log(`Server listening at ${Port}`);
})