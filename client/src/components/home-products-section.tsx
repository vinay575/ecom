import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Star, Download, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

export function HomeProductsSection() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mt-2">
              Explore hand-picked premium products from top creators
            </p>
          </div>

          <a href="/products" className="mt-6 md:mt-0">
            <Button variant="outline" className="group hidden md:flex">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                {/* Image */}
                <div className="relative w-full h-[160px] overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  {product.isFeatured && (
                    <Badge className="absolute left-3 top-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                      Featured
                    </Badge>
                  )}

                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 bg-gray-800/90 backdrop-blur-sm transition-opacity duration-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Details */}
                <CardContent className="p-4 flex-1 flex flex-col justify-between">
                  <Badge
                    variant="secondary"
                    className="mb-2 w-fit text-xs font-medium"
                  >
                    {product.category}
                  </Badge>

                  <h3 className="font-semibold mb-1 line-clamp-2 text-sm md:text-base text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    by {product.author}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {Number(product.rating).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-gray-400">
                        {product.downloads}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    ${Number(product.price).toFixed(2)}
                  </div>
                  <Button
                    size="sm"
                    className="gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile “View All” */}
        <div className="mt-10 text-center md:hidden">
          <a href="/products">
            <Button variant="outline" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
