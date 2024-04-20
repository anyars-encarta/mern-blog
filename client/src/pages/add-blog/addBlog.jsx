import { useContext, useEffect } from 'react';
import classes from './addBlog.module.css';
import { GlobalContext } from '../../context/context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBlog = () => {
    const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddBlog = async () => {
        const response = isEdit
            ? await axios.put(`https://mern-blog-api-kappa.vercel.app/api/blogs/update/${location.state.currentBlog._id}`, { title: formData.title, description: formData.description })
            : await axios.post('https://mern-blog-api-kappa.vercel.app/api/blogs/new', { title: formData.title, description: formData.description });

            // development
            // ? await axios.put(`http://localhost:5000/api/blogs/update/${location.state.currentBlog._id}`, { title: formData.title, description: formData.description })
            // : await axios.post('http://localhost:5000/api/blogs/new', { title: formData.title, description: formData.description });
        const result = await response.data;

        // if(result && result.newBlog.title.length === 0) {
        //     alert('Please enter Blog Title')
        //     return
        // }

        // if(result && result.newBlog.description.length === 0) {
        //     alert('Please enter Blog Description')
        //     return
        // }

        // if(result && result.newBlog.title.length > 0 && result.newBlog.description.length > 0) {
        if (result) {
            setIsEdit(false);
            setFormData({
                title: '',
                description: ''
            });

            navigate('/')
        }
    }

    useEffect(() => {
        if (location.state) {
            const { currentBlog } = location.state;
            setIsEdit(true);

            setFormData({
                title: currentBlog.title,
                description: currentBlog.description
            })
        }
        // eslint-disable-next-line
    }, [location]);

    return (
        <div className={classes.wrapper}>
            <h1>{isEdit ? 'Edit Blog' : 'Add a New Blog'}</h1>
            <div className={classes.formWrapper}>
                <input
                    name='title'
                    placeholder='Enter Blog Title'
                    id='title'
                    type='text'
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <textarea
                    name='description'
                    placeholder='Enter Blog description'
                    id='description'
                    required
                    rows={10}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <button onClick={handleAddBlog}>{isEdit ? 'Update Blog' : 'Add New Blog'}</button>
            </div>
        </div>
    )
};

export default AddBlog;