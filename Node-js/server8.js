import http from 'http'
import fs from 'fs'

const PORT = 7000;


const server = http.createServer((req,res)=>{

    if(req.url === '/api/fab' && req.method === 'GET'){
        fs.readFile('./input.json','utf-8',(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'File not found'}))
            }

            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(JSON.parse(data)));
        })
    }


    if(req.url.startsWith( '/api/fab/') && req.method === 'PUT'){
        const id = parseInt(req.url.split('/')[3]);

        let body = '';

        req.on('data',(chunk)=>{
            body +=chunk.toString();
        })

        req.on('end',()=>{
            const newTask = JSON.parse(body);

             fs.readFile('./input.json','utf-8',(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
              return  res.end(JSON.stringify({message:'File not found'}))
            }
        const tasks = JSON.parse(data);
        const index = tasks.findIndex(t=>t.id === id);

        if(index === -1){
             res.writeHead(404,{'Content-Type':'application/json'});
             return   res.end(JSON.stringify({message:'index not found'}))
        }

        tasks[index] = {...tasks[index],...newTask};

        fs.writeFile('./output.json',JSON.stringify(tasks,null,2),(err)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'File not found'}))
            }
            res.writeHead(200,{'Content-Type':'application/json'});
            return  res.end(JSON.stringify({message:'message updated',tasks}));
        })

        })
        })

       
    }


    if(req.url.startsWith('/api/fab/') && req.method === 'DELETE'){
        const id = parseInt(req.url.split('/')[3]);

        fs.readFile('./input.json','utf-8',(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'application/json'})
                res.end(JSON.stringify({message:'File not found'}))
            }

            const tasks = JSON.parse(data);

            const index = tasks.findIndex(t=>t.id === id)

            tasks.splice(index,1);

            fs.writeFile('./output.json',JSON.stringify(tasks,null,2),(err)=>{
                if(err){
                    res.writeHead(404,{message:'File not found'});
                }

                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:'Task deleted',tasks}))
            })
        })
    }


})


server.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})