import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();


// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// get all posts
router.route('/all').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// create a post
router.route('/post').post(async (req, res) => {
    // console.log(req.body)
    try {
        const { name, prompt, photo } = req.body;

        const photoURL = await cloudinary.uploader.upload(photo);

        const newPost = await new Post({
            name,
            prompt,
            photo: photoURL.url
        })
        await newPost.save();
        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})
export default router;