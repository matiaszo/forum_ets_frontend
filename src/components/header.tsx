import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import ets_logo from "@/assets/ets_logo.png"
import user_logo from "@/assets/user_logo.png"

export const Header = ( {instructor} : {instructor : Boolean}) => {

    const style= {
        option: "font-robFont text-blue2 text-xl"
    }
    
    return(
        <div className="flex items-center w-[100%] bg-white shadow-md fixed top-0">

            <h1 className="ml-6 p-3">
                <Image src={ets_logo} width={80} height={170} alt="ets logo"/>
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
                <Link href={ROUTES.profile}><Image src={user_logo} width={40} height={40} alt="ets logo"/></Link>
            </div>
        </div>
    )
}