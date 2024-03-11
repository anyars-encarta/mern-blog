import classes from './addBlog.module.css';

const AddBlog = () => {
    return (
        <div className={classes.wrapper}>
            <h1>Add a New Blog</h1>
            <div className={classes.formWrapper}>
                <input
                    name='title'
                    placeholder='Enter Blog Title'
                    id='title'
                    type='text'
                />

                <textarea 
                name='description'
                placeholder='Enter Blog description'
                id='description'
                />

                <button>Add New Blog</button>
            </div>
        </div>
    )
};

export default AddBlog;