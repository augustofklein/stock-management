import User from '../../model/User'
import firebase from '../../firebase/config'
import { useState, createContext, useEffect } from 'react'
import route from 'next/router'
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User
    carregando?: boolean
    cadastrar?: (email: string, senha: string) => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<User> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        name: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provider: usuarioFirebase.providerData[0]?.providerId,
        urlImage: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if(logado) {
        Cookies.set('admin-template-auth', '',{
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}

export function AuthProvider(props: any) {

    const [carregando, setCarregando] = useState(true)
    const [user, setUser] = useState<User>()

    async function configurarSessao(usuarioFirebase: any) {
        if(usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUser(user)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUser(undefined)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true)
            const resp = await firebase.auth()
                .signInWithEmailAndPassword(email, senha)

            await configurarSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )

            await configurarSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email: string, senha: string) {
        try {
            setCarregando(true)
            const resp = await firebase.auth()
                .createUserWithEmailAndPassword(email, senha)

            await configurarSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        // Confirmamos que o usuário se logou em algum momento
        if(Cookies.get('admin-template-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            carregando,
            cadastrar,
            login,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext