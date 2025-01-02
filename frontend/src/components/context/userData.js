import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import url from "../auth/backendUrl";

const UserData = createContext();

export {UserData}



const UserDataProvider = ({children})=>{
    const { isAuthenticated, checkAuthStatus } = useContext(AuthContext);

    const [userInfo,setUserInfo] = useState([])

     const [loading, setLoading] = useState(false);

    useEffect(()=>{
        // console.log(userInfo)
        if (!isAuthenticated || loading) {
            setUserInfo([]);
            return;
        }
        const idk = async()=>{
            const responce = await axios.get(url+"/get-profile",{
                headers: {
                            'Content-Type': 'application/json',
                    },
                withCredentials:true
            })
            setUserInfo(responce.data)
        }
        idk();
    },[isAuthenticated, checkAuthStatus,loading])
    return(
    <UserData.Provider value = {{userInfo,setUserInfo,loading,setLoading}}>
        {children}
    </UserData.Provider>)
}

export default UserDataProvider;
