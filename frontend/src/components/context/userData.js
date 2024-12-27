import { createContext, useState } from "react";

const UserData = createContext();

export {UserData}

const UserDataProvider = ({children})=>{

    const [userInfo,setUserInfo] = useState([])
    return(
    <UserData.Provider value = {{userInfo,setUserInfo}}>
        {children}
    </UserData.Provider>)
}

export default UserDataProvider;
