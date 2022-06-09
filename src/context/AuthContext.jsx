import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({ logged: false });

    /* localStorage login */
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) {
            setAuth(auth);
        }
    }, []);


    const data = {
        auth,
        setAuth
    }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };
export default AuthContext;