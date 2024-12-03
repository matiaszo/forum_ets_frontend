import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import ets_logo from "@/assets/ets_logo.png"
import user_logo from "@/assets/user_logo.png"



export const Header = () => {

    const style= {
        option: "font-robFont text-blue5 text-xl"
    }
    return(
        <>
        <div className="flex justify-between items-center">

            <h1 className="">
                <Image src={ets_logo} width={100} height={200} alt="ets logo"/>
            </h1>

            <div className="flex mr-96 gap-8 justify-center items-center">
                <Link className={style.option} href={ROUTES.home}>Home</Link>
                <Link className={style.option} href={ROUTES.forum}>Fórum</Link>
                <Link className={style.option} href={ROUTES.chat}>Chats</Link>
                <Link className={style.option} href={ROUTES.project}>Projetos</Link>
                <Link  href={ROUTES.chat}><Image src={user_logo} width={50} height={50} alt="ets logo"/></Link>
            </div>
        </div>
        </>
    )
}