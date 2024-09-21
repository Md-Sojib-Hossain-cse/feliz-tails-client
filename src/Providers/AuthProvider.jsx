import app from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const axiosPublic = useAxiosPublic();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (currentUser, name, photoUrl) => {
        setLoading(true);
        return updateProfile(currentUser, { displayName: name, photoURL: photoUrl })
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //other sign in methods 
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const facebookSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider)
    }

    //user observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            if (currentUser) {
                axiosPublic.post("/jwt", loggedUser, { withCredentials: true })
                    .then(res => {
                        if(res.data){
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                    })
            }
            else{
                setLoading(false)
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [auth, axiosPublic, user])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        updateUser,
        logOut,
        googleSignIn,
        facebookSignIn,
    }

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;