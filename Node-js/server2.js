import http from 'http'

const PORT = 9000;

const users = [
    {id: 1, name:'Best', email: 'Best@gmail.com'},
    {id: 2, name:'Bestie', email: 'Bestie@gmail.com'},
    {id: 3, name:'Good', email: 'Good@gmail.com'}
]

const server = http.createServer((req,res)=>{

    if(req.url === '/api/users/' && req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(users))
    }
    
    else if(req.url.match('/api/users') && req.method === 'GET'){
        let id = parseInt(req.url.split('/')[3]);
        let user = users.find(u=>u.id === id);

        if(!user){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'User not found'}))
        }
         res.writeHead(200,{'Content-Type':'application/json'});
         res.end(JSON.stringify(user))
         
    }
    
    else if(req.url === '/api/users' && req.method === 'POST'){
        let body=''

        req.on('data',(chunk)=>{
            body +=chunk.toString();
        })

        req.on('end',()=>{
            let newUser = JSON.parse(body);
            users.push(newUser);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'User added',users}))
        })
    }
    else if(req.url.startsWith('/api/users/') && req.method === 'PUT'){
        const id = parseInt(req.url.split('/')[3]);
        let index = users.findIndex(u=>u.id === id);
        let body='';

        req.on('data',(chunk)=>{
            body += chunk.toString();
        })

        req.on('end',()=>{
            let newUser = JSON.parse(body);

            users[index]= {...users[index],...newUser};

            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'User updated',users}));
        })
        
    }

    else if(req.url.startsWith('/api/users/') && req.method === 'DELETE'){
        const id = parseInt(req.url.split('/')[3]);
        const index = users.findIndex(u=>u.id === id);

        if(index === -1){
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'User not found'}));
        }

        users.splice(index,1);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'User deleted',users}));
    }
})

  
 

server.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})