import { useState } from "react";
import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Download, Heart, ShoppingCart, SlidersHorizontal } from "lucide-react";
import type { Product } from "@shared/schema";

const categories = ["UI Kits", "Templates", "Plugins", "AI Tools", "Code Scripts", "Mobile Apps"];

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  const filteredProducts = allProducts.filter(product => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const price = Number(product.price);
    const matchPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchCategory && matchPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number(a.price) - Number(b.price);
      case "price-high":
        return Number(b.price) - Number(a.price);
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return Number(b.rating) - Number(a.rating);
      default:
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AnnouncementBar />
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Products</h1>
              <p className="text-muted-foreground">
                {sortedProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </h3>
                      {selectedCategories.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCategories([])}
                          className="mb-3 w-full"
                        >
                          Clear all filters
                        </Button>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Category</h4>
                      <div className="space-y-3">
                        {categories.map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={category}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={200}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div>
              {isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-96 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              ) : sortedProducts.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-lg text-muted-foreground">No products found matching your filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 200]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedProducts.map((product) => (
                    <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all border hover:border-primary">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        )}
                        {product.isFeatured && (
                          <Badge className="absolute left-2 top-2 bg-orange-500">
                            Featured
                          </Badge>
                        )}
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold mb-1 line-clamp-2 text-sm">
                          {product.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          by {product.author}
                        </p>

                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium">{Number(product.rating).toFixed(1)}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{product.downloads}</span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-4 pt-0 border-t">
                        <div className="flex items-center justify-between w-full">
                          <div className="text-xl font-bold">
                            ${Number(product.price).toFixed(2)}
                          </div>
                          <Button size="sm" className="gap-1">
                            <ShoppingCart className="h-4 w-4" />
                            Add
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
