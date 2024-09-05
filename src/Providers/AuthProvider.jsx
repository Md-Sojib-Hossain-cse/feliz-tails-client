import app from "@/firebase/firebase.config";
import { getAuth } from "firebase/auth";
import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const auth = getAuth(app);

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const authInfo = {
    }

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

AuthProvider.propTypes = {
    children : PropTypes.node,
}

export default AuthProvider;