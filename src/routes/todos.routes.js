const {Router} = require('express');
const router = Router();

const Todos = require('../models/todos')

router.get('/:authorID',async(req,res)=>{
  const todos = await Todos.find({authorID: req.params.authorID});
  res.json(JSON.stringify(todos));
});

router.get('/:id',async(req,res)=>{
  const todo = await Todos.findById(req.params.id)

  res.json(JSON.stringify(todo));
});

router.post('/',async(req,res)=>{

  const {title,description,priority,authorID} = req.body;

  const todo = new Todos({
    title,
    description,
    priority,
    authorID
  });

  await todo.save()

  res.json({
    status:'Todo Received'
  });
});

router.delete('/:id',async(req,res)=>{
  await Todos.findByIdAndDelete(req.params.id);
  console.log()
  res.json({
    status:'Todo Deleted'
  });
});

router.put('/:id',async(req,res)=>{

  const {title,description,priority} = req.body;

  await Todos.findByIdAndUpdate(req.params.id,{
    title,
    description,
    priority
  });

  res.json({
    status:'Task Updated'
  });
});

module.exports = router;