import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/context";
import axios from 'axios';

const Home = () => {
    const {blogsList, setBlogsList, loading, setLoading} = useContext(GlobalContext);

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            const result = await response.data;

            console.log(result);

            if(result && result.blogList && result.blogList.length > 0) {
                setBlogsList(result.blogList)
                setLoading(false)
            }

            console.log('Blog List', blogsList);
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBlogs()
    }, []);

    return (
        <div>
            <h1>Blogs List</h1>
            {
                loading ? 
                <h3>Loading blogs. Please wait...</h3> :
                <div>
                    {
                        blogsList.map(blogItem => <div ke={blogItem._id}>
                            <h3>{blogItem.title}</h3>
                            <p>{blogItem.description}</p>
                            <p>{blogItem.date}</p>
                        </div>)
                    }
                </div>
            }
        </div>
    )
};

export default Home;