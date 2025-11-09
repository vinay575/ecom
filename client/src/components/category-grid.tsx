import { Palette, Code, Puzzle, Wand2, FileCode, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  { icon: Palette, name: "UI Kits", count: 1200, color: "text-blue-500" },
  { icon: Code, name: "Templates", count: 850, color: "text-green-500" },
  { icon: Puzzle, name: "Plugins", count: 640, color: "text-purple-500" },
  { icon: Wand2, name: "AI Tools", count: 320, color: "text-primary" },
  { icon: FileCode, name: "Code Scripts", count: 580, color: "text-yellow-500" },
  { icon: Smartphone, name: "Mobile Apps", count: 290, color: "text-pink-500" },
];

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground">
            Find exactly what you need from our curated collections
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="flex flex-col items-center gap-4 p-6 text-center hover-elevate active-elevate-2 transition-shadow cursor-pointer"
              data-testid={`card-category-${index}`}
            >
              <div className="rounded-full bg-muted p-4">
                <category.icon className={`h-8 w-8 ${category.color}`} />
              </div>
              <div>
                <h3 className="font-semibold" data-testid={`text-category-name-${index}`}>
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-category-count-${index}`}>
                  {category.count} products
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
