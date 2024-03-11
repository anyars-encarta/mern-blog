import { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [formData, setFormData] = useState({title: '', description: ''});
    const [blogsList, setBlogsList] = useState([]);
    const [loading, setLoading] = useState(false);

    return(
        <GlobalContext.Provider value={{formData, setFormData, blogsList, setBlogsList, loading, setLoading}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState;