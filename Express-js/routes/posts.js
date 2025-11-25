import express from'express';
const router = express.Router();


let posts = [
    {id:1,title:'Post'},
    {id:2,title:'Post Two'},
    {id:3,title: 'Post Three'}
]


//Get all posts
router.get('/api/posts',(req,res)=>{
     res.json(posts);
})

//Get single post
router.get('/',(req,res)=>{
    const id= parseInt(req.params.id);
    res.json(posts.filter((p)=>p.id === id));
})

//Post a single post
router.get('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id === id);

    if(!post){
      return  res.status(404).json({msg:`A post with the id of ${id} was not found`});
    }
      res.status(200).json(post);
    
});

// Create new post
router.post('/',(req,res)=>{
    console.log(req.body);

    const newPost = {
        id: posts.length +1,
        title: req.body.title
    }

    if(!newPost.title){
        return res.status(400).json({msg: 'Please include a title'})
    }
    posts.push(newPost);
    
    res.status(201).json(posts);
})


export default router;