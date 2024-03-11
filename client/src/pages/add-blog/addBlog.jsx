import { useContext } from 'react';
import classes from './addBlog.module.css';
import { GlobalContext } from '../../context/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const AddBlog = () => {
    const { formData, setFormData } = useContext(GlobalContext);
    const navigate = useNavigate()

    const handleAddBlog = async () => {
        const response = await axios.post('http://localhost:5000/api/blogs/new', {title: formData.title, description: formData.description})
        const result = await response.data;

        if(result && result.newBlog.title.length === 0) {
            alert('Please enter Blog Title')
            return
        }

        if(result && result.newBlog.description.length === 0) {
            alert('Please enter Blog Description')
            return
        }

        if(result && result.newBlog.title.length > 0 && result.newBlog.description.length > 0) {
            setFormData({
                title: '',
                description: ''
            });

            navigate('/')
        }
    }

    return (
        <div className={classes.wrapper}>
            <h1>Add a New Blog</h1>
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
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <button onClick={handleAddBlog}>Add New Blog</button>
            </div>
        </div>
    )
};

export default AddBlog;