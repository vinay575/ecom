import { useQuery } from "@tanstack/react-query";
import { Star, CheckCircle, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  content: string;
  rating: number;
  verified: boolean;
  videoUrl?: string;
}

export function TestimonialsCarousel() {
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (testimonials.length === 0) return null;

  // Duplicate testimonials for smooth infinite loop
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-20 overflow-hidden bg-gray-100 dark:bg-gray-900/50 dark:from-gray-950 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(23.95deg 95% 52.94%)" }}>
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </motion.div>

        {/* Carousel wrapper */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {loopedTestimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-xl transition-all h-full flex flex-col min-w-[320px] max-w-[350px]"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="relative flex-1">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-indigo-200 dark:text-indigo-900" />
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-10 pl-4">
                      {testimonial.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
