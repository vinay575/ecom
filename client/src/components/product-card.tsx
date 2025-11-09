import { Star, Download, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  downloads: number;
  isFeatured?: boolean;
}

export function ProductCard({
  id,
  image,
  title,
  author,
  category,
  price,
  rating,
  downloads,
  isFeatured,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-shadow" data-testid={`card-product-${id}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          data-testid={`img-product-${id}`}
        />
        {isFeatured && (
          <Badge className="absolute left-2 top-2" data-testid={`badge-featured-${id}`}>
            Featured
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
          data-testid={`button-wishlist-${id}`}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Badge variant="secondary" className="mb-2" data-testid={`badge-category-${id}`}>
              {category}
            </Badge>
            <h3 className="font-semibold truncate" data-testid={`text-title-${id}`}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid={`text-author-${id}`}>
              by {author}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground" data-testid={`text-rating-${id}`}>
            {rating}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <Download className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground" data-testid={`text-downloads-${id}`}>
            {downloads}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-2xl font-bold" data-testid={`text-price-${id}`}>
            ${price}
          </div>
          <Button size="sm" data-testid={`button-add-cart-${id}`}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
