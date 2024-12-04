export default async function GetImage(image : string)
{
    return (await import(`@/assets/${image}`)).default
}