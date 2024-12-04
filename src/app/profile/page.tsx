import logo from "@/assets/logo_azul.png";
import check from "@/assets/checked.png";
import Image from 'next/image';
import { ROUTES } from "@/constants/routes";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div>
        <Header/>
      <h1>PROFILE</h1>
    </div>
  );
}
