import http from "http";

const PORT = 9000;

const tasks = [
  { id: 1, task: "Learn Node", status: "doing" },
  { id: 2, task: "Watch movie", status: "todo" },
  { id: 3, task: "Game", status: "done" },
];

const server = http.createServer((req, res) => {
  if (req.url === "/api/todos" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(tasks));
    res.end();
  } else if (req.url === "/api/todo" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let newTask = JSON.parse(body);
      tasks.push(newTask);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "task added", tasks }));
    });
  } else if (req.url.startsWith("/api/todo" ) && req.method === "PUT") {
      let id = parseInt(req.url.split('/')[3]);
      let body='';

      req.on('data',(chunk)=>{
        body +=chunk.toString()
      })

      req.on('end',()=>{
        const updatedData = JSON.parse(body);
        const index = tasks.findIndex(t=>t.id === id);

        if(index === -1){
            res.writeHead(404,{'Content-Type':'application/json'})
            return res.end({message:'task not found'})
        }

        tasks[index]={...tasks[index],...updatedData}
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:'task updated',tasks}))
      })
  }
  else if(req.url.match("/api/todo/") && req.method === 'DELETE'){
     const id = parseInt(req.url.split('/')[3]);
     const index = tasks.findIndex(t=>t.id === id);

    if(index === -1){
        res.writeHead(404,{"Content-Type":"application/json"});
        return res.end(JSON.stringify({message:'task not found'}))
    }

    tasks.splice(index,1);
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({message:'Task deleted',tasks}))
  }
  else if(req.url.startsWith( '/api/todo/') && req.method === 'GET'){
    const id = parseInt(req.url.split('/')[3]);
    const task = tasks.find(t=>t.id === id);

    if(!task){
        res.writeHead(404,{'Content-Type':'application/json'});
       return res.end(JSON.stringify({message:'task not found'}))
    }
     res.writeHead(200,{'Content-Type':'application/json'});
     return res.end(JSON.stringify(task))
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});


server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
