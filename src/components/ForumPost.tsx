import { StaticImport } from "next/dist/shared/lib/get-img-props"
import dynamic from "next/dynamic"
import Image, { StaticImageData } from "next/image"
import GetImage from "@/scripts/GetImage"

export default async function ForumPost({image}: {image : string})
{
    return(
    <>
        <div className="flex bg-slate-200 min-h-96 sm:mx-24">
            <div className="w-1/4 justify-center items-center min-h-full border-2 border-gray-500 border-solid">
                <Image src={await GetImage(image)} width={100} height={100} alt=""/>
                <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
            </div>
            <div className="w-3/4 justify-center items-center min-h-full border-2 border-gray-500 border-solid">
                <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
            </div>
        </div>
    </>
    )
}