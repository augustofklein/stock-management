import Image from 'next/image'
import loading from '../../../public/images/loading.gif'
import useAuth from '@/data/hook/useAuth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface ForceAuthenticationProps {
    children?:any
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {

    const { loadingAuth, user } = useAuth()

    const [componentToRender, setComponentToRender] = useState<JSX.Element | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (!loadingAuth && user?.email) {
          setComponentToRender(contentRender());
        } else if (loadingAuth) {
          setComponentToRender(loadingRender());
        } else {
          router.push('/authentication');
        }
      }, [loadingAuth, user, router]);
    
      const contentRender = () => {
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
      };
    
      const loadingRender = () => {
        return(
            <div className={`
                    flex justify-center items-center h-screen
                `}>
                <Image src={loading} alt=""/>
            </div>
        )
      };

      return componentToRender;

}