// import model
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

// Business Logic
exports.createComment = async(req,res) =>{
    try{
        // fetch data from request body
        const {post,user,body} = req.body;

        // create a comment object 
        const comment = new Comment({
            post,user,body
        });

        // save into the database
        const savedComment = await comment.save();

        // find the post by id and add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push : {comments:savedComment._id}},{new:true})
                            .populate("comments")  //populate the comments array with comment document
                            .exec();
        
        res.json({
            post:updatedPost,
        });
    }

    catch(err){
        return res.status(500)
        .json({
            message:"Error While Creating Comment", 
        })
    }
}

