import {useContext} from "react";
import {AuthContext} from "../context/authContext.tsx";


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuthContext must be used within the provider!');
    }
    return context;
}