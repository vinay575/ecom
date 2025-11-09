import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-t py-16 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Ready to Start Creating?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Join thousands of designers and developers who trust DigitalHub for their digital products.
            Get started today and bring your projects to life.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" data-testid="button-get-started">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" data-testid="button-browse-all">
              Browse All Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
