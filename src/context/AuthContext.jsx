import { createContext, useState } from "react";

const AuthContext = createContext();

<<<<<<< HEAD:src/context/AuthContex.jsx
const initialAuth = { logged: true };
=======
>>>>>>> 87222311b0d8406cc7c0110227d77e8100c6cd30:src/context/AuthContext.jsx

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ logged: true });
    const data = {
        auth,
        setAuth
    }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };
export default AuthContext;