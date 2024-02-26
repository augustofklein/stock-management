import useAppData from "@/data/hook/useAppData"
import Titulo from "./Title"
import ThemeSwitchButton from "./ThemeSwitchButton"
import UserAvatar from "./UserAvatar"

interface PageHeaderProps {
    title: string
    subTitle: string
}

export default function PageHeader(props: PageHeaderProps) {

    const { tema, alternarTema } = useAppData()

    return(
        <div className={`flex`}>
            <Titulo title={props.title} subTitle={props.subTitle}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <ThemeSwitchButton tema={tema} alternarTema={alternarTema || (() => {})}/>
                <UserAvatar className="ml-3"/>
            </div>
        </div>
    )

}