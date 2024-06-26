import { NavChildFooterLayout } from "@/components";
import {AboutUs, Welcome} from "./(landingPages)";

export default function Home() {
  return (
    <NavChildFooterLayout>
      <Welcome/>
      <AboutUs/>

    </NavChildFooterLayout>
  );
}
