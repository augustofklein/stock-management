import LateralMenu from "./LateralMenu"
import PageHeader from "./PageHeader"
import Content from './Content'
import useAppData from "@/data/hook/useAppData"
import ForceAuthentication from "../auth/ForceAuthentication"

interface LayoutProps {
    title: string
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    
    const { tema } = useAppData()

    return(
        <ForceAuthentication>
            <div className={`${tema} flex h-screen w-screen`}>
                <LateralMenu />
                <div className={`
                    flex flex-col w-full p-7
                    bg-gray-300 dark:bg-gray-800
                `}>
                    <PageHeader title={props.title} subTitle={props.subtitle}/>
                    <Content>
                        {props.children}
                    </Content>
                </div>
            </div>
        </ForceAuthentication>
    )
}