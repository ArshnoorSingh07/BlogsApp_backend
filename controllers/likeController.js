// import
const Post = require('../models/postModel');
const Like = require('../models/likeModel');

// like a post
exports.likePost = async(req,res) => {
    try{
        const {post,user} = req.body;

        const like = new Like({
            user,post
        })

        const savedLike = await like.save();

        // update the post selection basis on this 
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes:savedLike._id}},{new:true})
                                                        .populate("likes").exec();

        res.status(200)
        .json({
            post:updatedPost,
        })
    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            message:"Error While Liking a Post"
        })
    }
}


// unlike a post 
exports.unlikePost = async(req,res) => {
    try{
        const {post,like} = req.body;
        // find and delete from like section
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post
                                                        ,{$pull:{likes:deletedLike._id}}
                                                        ,{new:true});
    
        res.status(200)
        .json({
            post:updatedPost,
        })
    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            message:"Error While unLiking a Post"
        })
    }
}