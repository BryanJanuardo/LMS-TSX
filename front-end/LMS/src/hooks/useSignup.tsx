import {useState} from "react";
import {userSignUp} from "../API/UserAuth_API.tsx";
import {useAuthContext} from "./useAuthContext.ts";

export const useSignup = () => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext()
    const signup = async (email:string, password: string) => {
        setIsLoading(true);
        setError(null);

        const response = await userSignUp(email, password);
        if (response.status === 201) {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: 'LOGIN', payload: { header: `User Register`, message: `Register Successfully`, error: ``, data: null } });
            setIsLoading(false);
            return { success: true };
        } else if (response.status === 400) {
            setError(response.data.error);
            setIsLoading(false);
            return { success: false, error: response.data.error };
        }

    }
    return { signup, isLoading, error }
}