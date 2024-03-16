import Image from 'next/image'
import loading from '../../../public/images/loading.gif'
import useAuth from '@/data/hook/useAuth'
import router from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'

interface ForceAuthenticationProps {
    children?:any
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {

    const { carregando, user } = useAuth()

    useEffect(() => {
        if (!carregando && !user?.email) {
            router.push('/authentication');
        }
    }, [carregando, user, router]);

    function renderizarConteudo() {
        return(
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("admin-template-auth")) {
                                    window.location.href = "/autenticacao"
                                }  
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return(
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt=""/>
            </div>
        )
    }

}