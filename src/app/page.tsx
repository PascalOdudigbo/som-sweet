import { NavChildFooterLayout } from "@/components";
import {AboutUs, ContactUs, Welcome} from "./(landingPages)";

export default function Home() {
  return (
    <NavChildFooterLayout>
      <Welcome/>
      <AboutUs/>
      <ContactUs/>
    </NavChildFooterLayout>
  );
}
