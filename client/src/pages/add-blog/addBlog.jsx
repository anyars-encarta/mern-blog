import { useContext } from 'react';
import classes from './addBlog.module.css';
import { GlobalContext } from '../../context/context';

const AddBlog = () => {
    const { formData, setFormData } = useContext(GlobalContext);
    console.log(formData);
    return (
        <div className={classes.wrapper}>
            <h1>Add a New Blog</h1>
            <div className={classes.formWrapper}>
                <input
                    name='title'
                    placeholder='Enter Blog Title'
                    id='title'
                    type='text'
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <textarea
                    name='description'
                    placeholder='Enter Blog description'
                    id='description'
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <button>Add New Blog</button>
            </div>
        </div>
    )
};

export default AddBlog;