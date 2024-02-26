import Image from 'next/image'
import loading from '../../../public/images/loading.gif'
import useAuth from '@/data/hook/useAuth'
import router from 'next/router'
import Head from 'next/head'

interface ForceAuthenticationProps {
    children?:any
}

export default function ForcarAutenticacao(props: ForceAuthenticationProps) {

    const { carregando, user } = useAuth()

    type RenderizarConteudoProps = {
        children?: any
      };

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

    if(!carregando && user?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autentication')
        return null
    }

}