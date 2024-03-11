import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/context";
import axios from 'axios';
import classes from './home.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Home = () => {
    const { blogsList, setBlogsList, loading, setLoading } = useContext(GlobalContext);

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            const result = await response.data;

            console.log(result);

            if (result && result.blogList && result.blogList.length > 0) {
                setBlogsList(result.blogList)
                setLoading(false)
            }

        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBlogs()
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
                            blogsList.map((blogItem, index) => (
                                <div ke={blogItem._id} className={classes.blogContent}>
                                    <div className={classes.blogTitle}>
                                        <h3>{blogItem.title}</h3>
                                        <p>Blog {' '} {index + 1}</p>
                                    </div>
                                    <p className={classes.blogTime}>Published on {new Date(blogItem.date).toLocaleString()}</p>

                                    <p>{blogItem.description}</p>

                                    <div className={classes.editDelete}>
                                        <FaEdit size={30} className={classes.edit} />
                                        <FaTrash size={30} className={classes.delete} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
};

export default Home;