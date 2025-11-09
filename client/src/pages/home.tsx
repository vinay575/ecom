import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { HeroCarousel } from "@/components/hero-carousel";
import { OurStorySection } from "@/components/our-story-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { HomeCategorySection } from "@/components/home-category-section";
import { HomeProductsSection } from "@/components/home-products-section";
import { HomeProductRequest } from "@/components/home-product-request";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroCarousel />
        <OurStorySection />
        <WhyChooseUs />
        <HomeCategorySection />
        <HomeProductsSection />
        <HomeProductRequest />
        <TestimonialsCarousel />
        
      </main>
      <Footer />
    </div>
  );
}
