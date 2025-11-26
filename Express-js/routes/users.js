import express from 'express'

const router = express.Router();

let users = [
  { id: 1, name: "John", email: "john@gmail.com" },
  { id: 2, name: "Mary", email: "mary@gmail.com" }
];


//Get all users
router.get('/',(req,res)=>{
    res.json(users);
})

//Get post by id
router.get('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(u=>u.id === id);
    if(!user){
        return res.status(400).json({message:'user not found'})
    }
    res.status(200).json({message:`User with ${id} is found`,user})
})


//Post a user
router.post('/',(req,res)=>{
    const newUser = {
        id:req.body.id,
        name:req.body.name,
        email:req.body.email
    }

    users.push(newUser);

    res.status(200).json({message:'User added succussfully',users})
})


//Put a user
router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
     
    const {name,email} =req.body;

    const user = users.find(u=>u.id === id);

    user.name = name || user.name;
    user.email = email || user.email;

    res.status(200).json({message:'User updated',user})
})


//DELETE
router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = users.findIndex(u=>u.id === id);

    if(index === -1){
        res.status(404).json({message:'user not found'})
    }
    users.splice(index,1);

  res.status(200).json({message:'user deleted ',users})
})


export default router;