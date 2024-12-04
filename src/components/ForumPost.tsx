import { StaticImport } from "next/dist/shared/lib/get-img-props"
import dynamic from "next/dynamic"
import Image, { StaticImageData } from "next/image"

export default async function ForumPost({image}: {image : string})
{
    let img = (await import(`@/assets/${image}`)).default
    return(
    <>
        <div className="flex bg-slate-200 h-full w-full">
            <div>
                <Image src={img} width={100} height={100} alt=""/>
            </div>
            <div>

            </div>
        </div>
    </>
    )
}