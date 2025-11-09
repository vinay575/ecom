import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { CategoryGrid } from "@/components/category-grid";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of digital products across different categories
            </p>
          </div>
          <CategoryGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
