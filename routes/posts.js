const router = require('express').Router();
const verifyToken = require('./verifyToken');
const Post = require('../models/Post');

//Validation
const { addPostValidation } = require('../validation')


//Add middleware here i.e verifyToken

//GET API - All posts
router.get('/', verifyToken , async (req,res)=>{
    try{
        const posts = await Post.find();
        if(!posts || posts.length === 0)
        {
            return res.status(200).json({
                status: false,
                message: 'No post found',
                data: [],
            });
        }
        res.status(200).json({
            status: true,
            message: 'Post found',
            data: posts,
        });

    }catch(err)
    {
        const code = err.code ? err.code : 500;
        res.status(code).json({
            status: false,
            message: err.message ? err.message : 'Something went wrong. Please try again!!',
            data: []
        });
    }
});
//POST API- My posts
router.post('/', verifyToken , async (req,res)=>{
    try{
        const posts = await Post.find({createdBy:req.user._id});
        if(!posts || posts.length === 0)
        {
            return res.status(200).json({
                status: false,
                message: 'No post found',
                data: [],
            });
        }
        res.status(200).json({
            status: true,
            message: 'Post found',
            data: posts,
        });

    }catch(err)
    {
        const code = err.code ? err.code : 500;
        res.status(code).json({
            status: false,
            message: err.message ? err.message : 'Something went wrong. Please try again!!',
            data: []
        });
    }
});

//POST API- Add post
router.post('/add', verifyToken , async (req,res)=>{

    
    // Lets validate the data before we create user
    const {error} = addPostValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        createdBy:req.user._id
    });
    
  try {
        const savedPost = await post.save();
        if(!savedPost || savedPost.length === 0)
        {
            return res.status(200).json({
                status: false,
                message: 'Something went wrong',
                data: [],
            });
        }
        res.status(200).json({
            status: true,
            message: 'Post added successfully!',
            data: savedPost,
        });
    } catch (err) {
        const code = err.code ? err.code : 500;
        res.status(code).json({
            status: false,
            message: err.message ? err.message : 'Something went wrong. Please try again!!',
            data: []
        });
    }
});



//POST API- Specific post
router.get('/:postId', verifyToken ,async (req,res)=>{
    const filter = { _id: req.params.postId, createdBy: req.user._id};
    try{
        const posts = await Post.find(filter);
        if(!posts || posts.length === 0)
        {
            return res.status(200).json({
                status: false,
                message: 'No post found with this ID',
                data: [],
            });
        }
        res.status(200).json(posts);

    }catch(err)
    {
        const code = err.code ? err.code : 500;
        res.status(code).json({
            status: false,
            message: err.message ? err.message : 'Something went wrong. Please try again!!',
            data: []
        });
    }
});


//POST API- Delete Post
router.delete('/:postId', verifyToken ,async (req,res)=>{
    const filter = { _id: req.params.postId, createdBy: req.user._id};
    try{
        
        const post = await Post.find(filter);
        if(!post || post.length === 0)
        {
            return res.status(200).json({
                status: false,
                message: 'This post does not belong to you',
                data: [],
            });
        }
        const posts = await Post.deleteOne(filter);
        if(posts.deletedCount==1)
        {
            res.status(200).json({
                status:true,
                message:"Post deleted Successfully",
                data: []
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:'Failed to deleted the post',
                data: post
            })

        }


    }catch(err)
    {
        const code = err.code ? err.code : 500;
        res.status(code).json({
            status: false,
            message: err.message ? err.message : 'Something went wrong. Please try again!!',
            data: []
        });
    }
});


//POST API- Update  post
router.patch('/:postId', verifyToken , async (req,res)=>{
    const filter = { _id: req.params.postId, createdBy: req.user._id};
    const updateData = {
       $set: {
        title: req.body.title,
       }
    };

  try {
        const post = await Post.find(filter);
        if(!post || post.length === 0)
        {
            return res.status(200).json({
                status: false,
                message: 'This post does not belong to you',
                data: [],
            });
        }
        const updatePost = await Post.updateOne(filter, updateData);
        if(updatePost.modifiedCount==1)
        {
            const updatedpost = await Post.find(filter);
            res.status(200).json({
                status:true,
                message:"Post updated Successfully",
                data: updatedpost
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:'Failed to update the post',
                data: post
            })

        }
    } catch (err) {
        const code = err.code ? err.code : 500;
        res.status(code).json({
            status: false,
            message: err.message ? err.message : 'Something went wrong. Please try again!!',
            data: []
        });
    }
});



module.exports = router;
