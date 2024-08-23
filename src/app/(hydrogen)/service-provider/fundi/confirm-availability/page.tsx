import ConfirmAvailability from "@/app/shared/service-provider/confirm-availability/confirm-availability";
import { Metadata } from "next";
import { Title } from "rizzui";

// SEO metadata
export const metadata: Metadata = {
  title: "New Page | Isomorphic",
};

export default function Home() {
  return (
    <>
    <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        View RFQ
    </Title>
    
    <ConfirmAvailability />
    </>
  )
}