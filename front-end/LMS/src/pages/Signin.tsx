import {useState} from 'react'
import { useSignin } from "../hooks/useSignin.tsx";
import {useNavigate} from "react-router-dom";

export const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signin , isLoading, error} = useSignin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signin(email, password);
        setEmail('');
        setPassword('');
        if (error != null) {
            window.location.reload();
        }
    }

    return (
        <form className="bg-gray-200 flex gap-5 animate-fadeIn p-5 flex-col justify-center items-center" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className="relative mb-6 w-64">
                <input
                    type="email"
                    id="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-sm text-gray-900 border-indigo-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <label
                    htmlFor="email"
                    className="absolute left-3 top-4 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm top-[0px] text-blue-500 text-xs"
                >
                    Email
                </label>
            </div>

            <div className="relative mb-6 w-64">
                <input
                    type="password"
                    id="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-sm text-gray-900 border-indigo-900 focus:outline-none focus:ring-1 focus:ring-indigo-900"
                />
                <label
                    htmlFor="password"
                    className="absolute left-3 top-4 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm top-[0px] text-blue-500 text-xs"
                >
                    Password
                </label>
            </div>

            <button disabled={isLoading} className='border-2 px-4 py-1 rounded-md hover:scale-110 transition-all border-violet-700'>{isLoading ? 'Loading...' : 'Sign In'}</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signin