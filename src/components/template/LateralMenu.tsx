import useAuth from "@/data/hook/useAuth";
import { SettingsIcon, HomeIcon, BellIcon, ExitIcon } from "../icons";
import Logo from "./Logo";
import ItemMenu from "./ItemMenu";

export default function LateralMenu() {

    const { logout } = useAuth()

    return(
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo/>
            </div>
            <ul className="flex-grow">
                <ItemMenu url="/" text="Início" icon={HomeIcon}/>
                <ItemMenu url="/ajustes" text="Ajustes" icon={SettingsIcon}/>
                <ItemMenu url="/notificacoes" text="Notificações" icon={BellIcon}/>
            </ul>
            <ul>
                <ItemMenu
                    text="Sair" icon={ExitIcon}
                    onCLick={logout}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}
                />
            </ul>
        </aside>
    )

}