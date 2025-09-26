import Advantages from "@/components/home/Advantages";
import ContactPage from "@/components/home/ContactSec";
import CtaSection from "@/components/home/CtaSection";
import { FaqSection } from "@/components/home/FaqSection";
import HeroCarousel from "@/components/home/HeroCarusel";
import QuestionsSec from "@/components/home/QuestionsSec";
import ShoplinkInfo from "@/components/home/ShoplinkInfo";
import StatsSection from "@/components/home/StatsSection";
import Testimonialssec from "@/components/home/Testimonialssec";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8" >
        <HeroCarousel />
      </div>

      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8">
        <StatsSection />
      </div>

      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8" id="about">
        <ShoplinkInfo />
      </div>
      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8">
        <Advantages />
      </div>

      <div >
        <CtaSection />
      </div>

      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8" id="features">
        <QuestionsSec />
      </div>
      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8" id="pricing">
        <Testimonialssec />
      </div>
      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8" id="contact">
        <ContactPage />
      </div>
      <div className="container mx-auto py-6 sm:py-8 md:py-18 px-4 sm:px-6 lg:px-8">
        <FaqSection />
      </div>
    </div>
  );
}