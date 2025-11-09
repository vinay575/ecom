import { ProductCard } from "./product-card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import uiKitImage from "@assets/generated_images/UI_kit_product_preview_daa4ad77.png";
import templateImage from "@assets/generated_images/Website_template_product_preview_bf071682.png";

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  if (isLoading) {
    return (
      <section className="border-t py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl" style={{ color: "hsl(23.95deg 95% 52.94%)" }}>
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Hand-picked premium products from top creators
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl" style={{ color: "hsl(23.95deg 95% 52.94%)" }}>
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Hand-picked premium products from top creators
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products?.map((product, index) => (
            <ProductCard 
              key={product.id} 
              {...product}
              price={Number(product.price)}
              rating={Number(product.rating)}
              image={index % 2 === 0 ? uiKitImage : templateImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
