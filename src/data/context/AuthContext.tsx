import firebase from '../../firebase/config'
import { useState, createContext, useEffect } from 'react'
import route from 'next/router'
import Cookies from 'js-cookie'
import Usuario from '@/model/Usuario'

interface AuthContextProps {
    usuario?: Usuario
    carregando?: boolean
    cadastrar?: (email: string, senha: string) => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalizeUser(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if(logado) {
        Cookies.set('stock-management-auth', 'true',{
            expires: 7
        })
    } else {
        Cookies.remove('stock-management-auth')
    }
}

export function AuthProvider(props: any) {

    const [carregando, setLoading] = useState(true)
    const [usuario, setUser] = useState<Usuario>()

    async function configSession(usuarioFirebase: any) {
        if(usuarioFirebase?.email) {
            const usuario = await normalizeUser(usuarioFirebase)
            setUser(usuario)
            gerenciarCookie(true)
            setLoading(false)
            return usuario.email
        } else {
            setUser(undefined)
            gerenciarCookie(false)
            setLoading(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )

            await configSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configSession(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('stock-management-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configSession)
            return () => cancelar()
        } else {
            setLoading(false)
        }
    }, [])

    return(
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext