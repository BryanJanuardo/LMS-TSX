import {useState} from "react";
import {userSignIn} from "../API/UserAuth_API.tsx";
import {useAuthContext} from "./useAuthContext.ts";

export const useSignin = () => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const signin = async (email:string, password: string) => {
        setIsLoading(true);
        setError(null);

        const response = await userSignIn(email, password);

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: 'LOGIN', payload: { header: `User Login`, message: `Login Successfully`, error: ``, data: null } });
            setIsLoading(false);
            return { success: true };
        } else if (response.status === 400) {
            setError(response.data.error);
            setIsLoading(false);
            return { success: false, error: response.data.error };
        }
    }
    return { signin, isLoading, error }
}