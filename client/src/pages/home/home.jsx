import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/context";
import axios from 'axios';
import classes from './home.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { blogsList, setBlogsList, loading, setLoading} = useContext(GlobalContext);
    const navigate = useNavigate();
    
    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://mern-blog-api-kappa.vercel.app/api/blogs');
            // headers: {"Content-Type": "application/json"}
            // development
            // const response = await axios.get('http://localhost:5000/api/blogs');
            const result = await response.data;
            console.log(result)

            if (result && result.blogList && result.blogList.length > 0) {
                setBlogsList(result.blogList)
                setLoading(false)
            } else {
                setLoading(false)
                setBlogsList([])
            }

        } catch (e) {
            setLoading(false)
        }
    };

    const handleDeleteBlog = async (getCurrentId) => {
        const response = await axios.delete(`https://mern-blog-api-kappa.vercel.app/api/blogs/delete/${getCurrentId}`);
        // development
        // const response = await axios.delete(`http://localhost:5000/api/blogs/delete/${getCurrentId}`);
        const result = await response.data;

        if (result && result.blogList && result.blogList.length > 0) {
            setBlogsList(result.blogList)
        }

        if (result?.message) {
            alert(result.message)
            fetchBlogs()
        }
    };

    const handleEditBlog = async (currentBlog) => {
        navigate('/new-blog', { state: { currentBlog } })
    }

    useEffect(() => {
        fetchBlogs()
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.wrapper}>
            <div className={classes.blogsHeader}>
                <h1>Blogs List</h1>
                <h3>Number of blogs: {' '} {blogsList.length}</h3>
            </div>

            {
                loading ?
                    <h3 className={classes.loading}>Loading blogs. Please wait...</h3> :
                    <div className={classes.blogList}>
                        {
                            blogsList && blogsList.length ? blogsList.map((blogItem, index) => (
                                <div key={blogItem._id} className={classes.blogContent}>
                                    <div className={classes.blogTitle}>
                                        <h3>{blogItem.title}</h3>
                                        <p>Blog {' '} {index + 1}</p>
                                    </div>
                                    <p className={classes.blogTime}>Published on {new Date(blogItem.date).toLocaleString()}</p>

                                    <p>{blogItem.description}</p>

                                    <div className={classes.editDelete}>
                                        <FaEdit size={30} onClick={() => handleEditBlog(blogItem)} className={classes.edit} />
                                        <FaTrash size={30} onClick={() => handleDeleteBlog(blogItem._id)} className={classes.delete} />
                                    </div>
                                </div>
                            )) : <h3 className={classes.loading}>No blogs. Please add some blogs</h3>
                        }
                    </div>
            }
        </div>
    )
};

export default Home;