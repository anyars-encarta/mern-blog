import { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [formData, setFormData] = useState({title: '', description: ''});

    return(
        <GlobalContext.Provider value={{formData, setFormData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState;