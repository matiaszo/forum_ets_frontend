import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import ets_logo from "@/assets/ets_logo.png"
import user_logo from "@/assets/user_logo.png"
import logoutimg from '@/assets/logout.png';

export const Header = ( {instructor} : {instructor : Boolean}) => {

    const style= {
        option: "font-robFont text-blue5 text-xl"
    }

    const logout = () => {
        localStorage.setItem("token", "")
        localStorage.setItem("id", "")
    }
    
    return(
        <div className="flex items-center w-[100%] bg-white shadow-md fixed top-0">

            <h1 className="ml-6">
                <Image src={ets_logo} width={100} height={200} alt="ets logo"/>
            </h1>

            <div className="flex flex-grow gap-28 justify-end items-center mr-6">
                {instructor ? (
                    <Link className={style.option} href={ROUTES.admin}>Admin</Link>
                ) : (
                    <></>
                )}
                <Link className={style.option} href={ROUTES.home}>Home</Link>
                <Link className={style.option} href={ROUTES.forum}>Fórum</Link>
                <Link className={style.option} href={ROUTES.chat}>Chats</Link>
                <Link className={style.option} href={ROUTES.project}>Projetos</Link>
                <Link href={ROUTES.profile}><Image src={user_logo} width={50} height={50} alt="ets logo"/></Link>
                <Link href={ROUTES.login} onClick={logout}><Image src={logoutimg} width={33} height={33} alt="ets logo"/></Link>
            </div>
        </div>
    )
}