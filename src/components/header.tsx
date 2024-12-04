import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import ets_logo from "@/assets/ets_logo.png"
import user_logo from "@/assets/user_logo.png"



export const Header = ({first, second, third, fourth}: any) => {

    const style= {
        option: "font-robFont text-blue5 text-sm md:text-xl sm:text-lg"
    }
    return(
        <>
        <div className="flex justify-between items-center shadow-md w-full">

            <h1 className="justify-self-start sm:ml-6">
                <Image src={ets_logo} width={100} height={200} alt="ets logo" className="w-12 sm:w-auto sm:h-12 object-contain"/>
            </h1>

            <div className="flex sm:gap-16 min-h-12 gap-2 justify-self-end items-center sm:mr-6">
                <Link className={style.option} href={ROUTES.home}>{first}</Link>
                <Link className={style.option} href={ROUTES.forum}>{second}</Link>
                <Link className={style.option} href={ROUTES.chat}>{third}</Link>
                <Link className={style.option} href={ROUTES.project}>{fourth}</Link>
                <Link  href={ROUTES.chat}><Image src={user_logo} width={50} height={50} alt="user logo" className="h-12 object-contain"/></Link>
            </div>
        </div>
        </>
    )
}