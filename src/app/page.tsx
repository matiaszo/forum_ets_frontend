import Link from "next/link";

export default function Home() {
  return (
  <>
    <h1 className="font-robFont text-blue5" >hi bro</h1>
    <Link href={"/forum"}>Forum</Link>
  </>
  );
}
