import { CalculatorsSection } from "@/components/calculator-section";
import { ContactSection } from "@/components/contact-section";
import { FaqSection } from "@/components/faq-section";
import { GallerySection } from "@/components/gallery-section";
import { Hero } from "@/components/hero";
import { OrderSection } from "@/components/order-section";
import { ProcessSection } from "@/components/process-section";
import { ReviewsSection } from "@/components/reviews-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <GallerySection />
        <ProcessSection />
        <CalculatorsSection />
        <ReviewsSection />
        <FaqSection />
        <OrderSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
