import { SettingsIcon, HomeIcon, BellIcon, ExitIcon } from "../icons";
import Logo from "./Logo";
import ItemMenu from "./ItemMenu";

export default function LateralMenu() {

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
            </ul>
        </aside>
    )

}