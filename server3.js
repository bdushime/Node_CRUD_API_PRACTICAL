import http from 'http'

const PORT = 9000;


const notes = [
    {id: 1, title:'Best', content: 'sport'},
    {id: 2, title:'Bestie', content: 'game'},
    {id: 3, title:'Good', content: 'football'}
]

const server = http.createServer((req,res)=>{
    if (req.url === '/api/notes' && req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(notes));
    }

    else if(req.url === '/api/notes' && req.method === 'POST'){
        let body = '';

        req.on('data',(chunk)=>{
           body +=chunk.toString();
        })

        req.on('end',()=>{
            let newNote = JSON.parse(body);
            notes.push(newNote)
            
              res.writeHead(200,{'Content-Type':'application/json'});
              res.end(JSON.stringify({message:'Notes added',notes}));
            

        })
    }

    else if(req.url.startsWith('/api/notes/') && req.method === 'GET'){
        const id = parseInt(req.url.split('/')[3]);
        const note = notes.find(n=>n.id === id);

        if(!note){
               res.writeHead(200,{'Content-Type':'application/json'});
              res.end(JSON.stringify({message:'Notes not found'}));
        }
           res.writeHead(200,{'Content-Type':'application/json'});
              res.end(JSON.stringify(note));
    }

    else if(req.url.startsWith('/api/notes/') && req.method === 'PUT'){
        const id = parseInt(req.url.split('/')[3]);
        const index = notes.findIndex(n=>n.id === id);

        if (index === -1) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({ message: 'Note not found' }));
    }

        let body ='';
        req.on('data',(chunk)=>{
           body +=chunk.toString()
        })

        req.on('end',()=>{
            let updatedNote = JSON.parse(body);
            notes[index] = {...notes[index],...updatedNote}

            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'Notes updated',notes}));
        })
    }

    else if(req.url.startsWith('/api/notes/') && req.method === 'DELETE'){
        const id = parseInt(req.url.split('/')[3]);
        const index = notes.findIndex(n=>n.id === id);

            if (index === -1) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({ message: 'Note not found' }));
    }

        notes.splice(index,1)
         res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Note deleted' ,notes}));

    }
})


server.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`)
})