import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Hero_digital_products_showcase_3536a11c.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      <div className="container relative mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <Badge className="self-start" data-testid="badge-ai-powered">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Search
            </Badge>

            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Premium Digital Products for Creators
            </h1>

            <p className="text-lg text-muted-foreground md:text-xl">
              Discover high-quality UI kits, templates, plugins, and tools. 
              Built by professionals, trusted by thousands of designers and developers worldwide.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" data-testid="button-browse-products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-learn-more">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl" />
            <img
              src={heroImage}
              alt="Digital products showcase"
              className="relative rounded-xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
