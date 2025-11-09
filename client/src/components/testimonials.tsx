import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import avatar1 from "@assets/generated_images/Female_customer_testimonial_avatar_0a96e832.png";
import avatar2 from "@assets/generated_images/Male_customer_testimonial_avatar_3deee3e5.png";
import avatar3 from "@assets/generated_images/Young_female_testimonial_avatar_013dea30.png";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Designer",
    avatar: avatar1,
    content: "The UI kits from DigitalHub saved me weeks of design work. The quality is outstanding and the components are so well organized.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: avatar2,
    content: "Best marketplace for developer tools. The code quality is excellent and everything is well documented. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Creative Director",
    avatar: avatar3,
    content: "I've purchased over 10 products and every single one exceeded my expectations. The instant delivery and lifetime updates are amazing.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="border-t py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Loved by Creators
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say about their experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col gap-4 p-6" data-testid={`card-testimonial-${testimonial.id}`}>
              <div className="flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm leading-relaxed" data-testid={`text-testimonial-content-${testimonial.id}`}>
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t">
                <Avatar data-testid={`avatar-testimonial-${testimonial.id}`}>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm" data-testid={`text-testimonial-name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
