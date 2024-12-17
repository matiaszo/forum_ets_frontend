import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import ets_logo from "@/assets/ets_logo.png"
import user_logo from "@/assets/user_logo.png"
import logoutimg from '@/assets/logout.png';

export const Header = ( {instructor} : {instructor : Boolean}) => {

    const style= {
        option: "font-robCondensed text-blue2 text-[18px] hover:border-b-2 hover:border-blue1"
    }

    const logout = () => {
        localStorage.setItem("token", "")
        localStorage.setItem("id", "")
    }
    
    return(
        <div className="flex items-center w-[100%] bg-white shadow-md fixed top-0 p-1">

            <h1 className="ml-6">
                <Image src={ets_logo} width={90} height={90} alt="ets logo"/>
            </h1>

            <div className="flex flex-grow gap-16 justify-end items-center mr-6">
                {instructor ? (
                    <Link className={style.option} href={ROUTES.admin}>Admin</Link>
                ) : (
                    <></>
                )}
                <Link className={style.option} href={ROUTES.home}>Home</Link>
                <Link className={style.option} href={ROUTES.forum}>Fórum</Link>
                <Link className={style.option} href={ROUTES.chat}>Chats</Link>
                <Link className={style.option} href={ROUTES.project}>Projetos</Link>
                <Link className={style.option} href={ROUTES.profile}>Profile</Link>
                <Link className={style.option} href={ROUTES.login} onClick={logout}>Logout</Link>
            </div>
        </div>
    )
}