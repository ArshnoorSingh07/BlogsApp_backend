// Import model
const Post = require('../models/postModel');

exports.createPost = async(req,res) =>{
    try{
        const {title,body} = req.body;
        const post = new Post({
            title,body
        });

        const savedPost = await post.save();

        res.json({
            message:savedPost,
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Error while creating post"
        })
    }
}


exports.getAllPosts = async(req,res)=>{
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();

        res.status(200)
        .json({
            message:posts,
        })
    }
    catch(err){
         return res.status(500).json({
            message:"Error while fetching posts"
        })
    }
}