import express from'express';
const router = express.Router();


let posts = [
    {id:1,title:'Post'},
    {id:2,title:'Post Two'},
    {id:3,title: 'Post Three'}
]


//Get all posts
router.get('/',(req,res)=>{
     res.json(posts);
})


//Get all post
// router.get('/api/posts',(req,res)=>{
//     res.json(posts);
// })

// Get post by id
router.get('/api/posts/:id',(req,res)=>{
 const id= parseInt(req.params.id);
 return res.json(posts.filter(p=>p.id === id));
})

//Get single post
// router.get('/',(req,res)=>{
//     const id= parseInt(req.params.id);
//     res.json(posts.filter((p)=>p.id === id));
// })

//get a single post
router.get('/:id',(req,res)=>{
   const id = parseInt(req.params.id);
   const post = posts.find(p=>p.id===id);
   
   res.status(200).json(post)
});

// Create new post
router.post('/',(req,res)=>{
   const newTask = {
    id:req.body.id,
    title:req.body.title
   }

   posts.push(newTask);
   res.status(200).json({message:'post added',posts})
})

//PUT
// router.put('/api/posts/:id',(req,res)=>{
//     const id = parseInt(req.params.id);
//     const {title} = req.body;

//     const post = posts.find(p=>p.id === id);

//     if(!post){
//         return res.status(404).json({msg:'No post found with id ${id}'});      
//     }
//     post.title = title || post.title;
//     res.status(200).json({msg:'Post updated',post});

// })

//PUT
router.put('/:id',(req,res)=>{
    const id= parseInt(req.params.id);
    const {title} = req.body;

    const post = posts.find(p=>p.id === id);

    if(!post){
        return res.status(404).json({message:'post not found'});
    }

    post.title = title || post.title;
    res.status(200).json({msg:'Post updated',post});
})

//DELETE
router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p=>p.id === id);

    if(index === -1){
        res.status(404).json({message:'index not found'})
    }

    posts.splice(index,1)
    res.status(200).json({message: 'post deleted successfully',posts})
})

export default router;