import { Link, NavLink } from "react-router-dom";
import classes from './header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <h3><Link to={'/'}>MERN Blog</Link></h3>
            <div>
                <ul>
                    <li>
                        <NavLink to={'/'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/new-blog'}>New Blog</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Header;