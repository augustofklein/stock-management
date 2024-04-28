import Image from 'next/image'
import loading from '../../../public/images/loading.gif'
import useAuth from '@/data/hook/useAuth'
import router from 'next/router'
import Head from 'next/head'

interface ForceAuthenticationProps {
    children?:any
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {

    const { carregando, usuario } = useAuth()

    type RenderizarConteudoProps = {
        children?: any
      };

    function renderizeContent() {
        return(
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("stock-management")) {
                                    window.location.href = "/authentication"
                                }  
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function rendirezeLoading() {
        return(
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt=""/>
            </div>
        )
    }

    if(!carregando && usuario?.email) {
        return renderizeContent()
    } else if (carregando) {
        return rendirezeLoading()
    } else {
        router.push('/authentication')
        return null
    }

}