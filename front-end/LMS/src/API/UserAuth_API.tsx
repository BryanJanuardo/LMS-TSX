import axios from "axios";


export const userSignUp = async (email: string, password:string) => {
    try {
        const res =  await axios.post("http://localhost:5000/api/users/signup", {
            email: email,
            password: password,
        });
        return res;
    }catch (e) {
        console.log(e.response)
        return e.response;
    }
}

export const userSignIn = async (email: string, password:string) => {
    try {
        const res = await axios.post("http://localhost:5000/api/users/signin", {
            email: email,
            password: password,
        })
        return res;
    }catch (e) {
        return e.response;
    }
}