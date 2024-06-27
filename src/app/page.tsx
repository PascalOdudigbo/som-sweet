import { NavChildFooterLayout } from "@/components";
import {AboutUs, ContactUs, LatestTreats, Welcome} from "./(landingPages)";

export default function Home() {
  return (
    <NavChildFooterLayout>
      <Welcome/>
      <LatestTreats/>
      <AboutUs/>
      <ContactUs/>
    </NavChildFooterLayout>
  );
}
