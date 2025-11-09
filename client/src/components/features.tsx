import { Shield, Zap, Download, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "SSL encrypted checkout with Stripe. Your data is always protected.",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Download your products immediately after purchase. No waiting.",
  },
  {
    icon: Download,
    title: "Lifetime Updates",
    description: "Get free updates forever. Access new versions as they're released.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our team is here to help whenever you need assistance.",
  },
];

export function Features() {
  return (
    <section className="border-t py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Why Choose DigitalHub
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for a seamless digital shopping experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={feature.title} className="flex flex-col items-center gap-4 p-6 text-center" data-testid={`card-feature-${index}`}>
              <div className="rounded-full bg-primary/10 p-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-lg" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
