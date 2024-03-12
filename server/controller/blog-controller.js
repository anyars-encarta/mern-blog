const mongoose = require('mongoose');
const Blog = require('../model/Blog');

// fetch a single blog
const fetchSingleBlog = async (req, res) => {
    const id = req.params.id;
    let singleBlog;

    try {
        singleBlog = await Blog.findById(id);
    } catch (e) {
        console.log(e)
    }

    if (!singleBlog) {
        return (res.status(404).json({ message: 'Blog Not Found' }))
    }

    return (res.statu(200).json({ singleBlog }))
};

// fetch list of blogs
const fetchListOfBlogs = async (req, res) => {
    let blogList;

    try {

        blogList = await Blog.find();

    } catch (e) {
        console.log(e);
    }

    if (!blogList) {
        return (res.status(404).json({ message: 'No Blogs Found' }))
    }

    return (res.status(200).json({ blogList }));
};

// add a new blog
const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newBlog = new Blog({
        title, description, date: currentDate
    })

    try {
        await newBlog.save();
    } catch (e) {
        console.log(e);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save(session);
        session.commitTransaction();
    } catch (e) {
        return (res.send(500).json({ message: e }))
    }

    return (res.status(200).json({ newBlog }));
};

// delete a blog
const deleteBlog = async (req, res) => {
    const id = req.params.id;

    try {
        const currentBlog = await Blog.findByIdAndDelete(id);

        if (!currentBlog) {
            return (res.status(404).json({ message: 'Blog Not Found' }))
        }

        return (res.status(200).json({ message: 'Blog deleted successfully!' }));

    } catch (e) {
        return (res.status(500).json({ message: 'Unable to delete! Please try again' }))
    }
};

// update a blog
const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    let currentBlog;

    try {
        currentBlog = await Blog.findByIdAndUpdate(id, { title, description });

        if (!currentBlog) {
            return (res.status(404).json({ message: 'Unable to update' }));
        }

        return (res.send(200).json({ currentBlog }));

    } catch (e) {
        return (res.send(500).json({ message: 'Unable to Update! Please try again' }))
    }
}

module.exports = { fetchSingleBlog, fetchListOfBlogs, addNewBlog, deleteBlog, updateBlog };