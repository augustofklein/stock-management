import AuthInput from "@/components/auth/AuthInput";
import { useAuth } from "@/data/context/AuthContext";
import { useState } from "react";

export default function Authentication() {

    const { login } = useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`text-3xl font-bold mb-5`}>
                    Enter with your account
                </h1>

                <AuthInput
                    label="Username"
                    tipo="text"
                    valor={username}
                    valorMudou={setUsername}
                    obrigatorio
                />
                <AuthInput
                    label="Password"
                    tipo="password"
                    valor={password}
                    valorMudou={setPassword}
                    obrigatorio
                />

                <hr className="my-6 border-gray-300 w-full"/>

                <button onClick={() => login(username, password)} className={`
                    w-full bg-blue-500 hover:bg-blue-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Enter
                </button>
            </div>
        </div>
    )
}