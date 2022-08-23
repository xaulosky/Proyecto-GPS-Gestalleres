import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

<<<<<<< HEAD:src/context/AuthContex.jsx
const initialAuth = { logged: true };

=======
>>>>>>> 308a94d8cf4c2bed921966e8a6765b715496615e:src/context/AuthContext.jsx
const AuthProvider = ({ children }) => {

    const login = JSON.parse(localStorage.getItem('auth')) || { logged: true };

    const [auth, setAuth] = useState(login);

    const data = {
        auth,
        setAuth
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };

export default AuthContext;