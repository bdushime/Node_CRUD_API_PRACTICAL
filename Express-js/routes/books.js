import express from 'express'

const router = express.Router();

let books = [
  { id: 1, title: "Think Big", author: "Ben Carson" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];


//Get all books
router.get('/',(req,res)=>{
   res.json(books);
})

//Get book by id
router.get('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = books.find(p=>p.id === id);
    res.status(200).json({message:'book retrieved successfully',post})
})

//Post 
router.post('/',(req,res)=>{
    const newBook = {
        id:req.body.id,
        title:req.body.title,
        author:req.body.author
    }

    books.push(newBook);
    res.status(200).json({message:'book added successfully',books})
})

//Put
router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const{title,author} = req.body;

    const book = books.find(b=>b.id === id);

    book.title = title || book.title;
    book.author = author || book.author;
    res.status(200).json({message:'Book updated',book})
})

//Delete
router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = books.findIndex(b=>b.id === id);

    books.splice(index,1);

    res.status(200).json({message:'books deleted',books})
})


export default router;