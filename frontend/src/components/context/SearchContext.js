import { createContext, useState } from "react";

const SearchContext = createContext();

export {SearchContext}

const SearchContextProvider = ({children})=>{

    const [search,setSearch] = useState("")
    return(
    <SearchContext.Provider value = {{search,setSearch}}>
        {children}
    </SearchContext.Provider>)
}

export default SearchContextProvider;
