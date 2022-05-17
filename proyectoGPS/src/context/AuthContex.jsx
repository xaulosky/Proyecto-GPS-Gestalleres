import { createContext, useState } from "react";

const AuthContext = createContext();

const initialAuth = { logged: false };

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialAuth);



    const data = {
        auth,
        setAuth
    }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };
export default AuthContext;