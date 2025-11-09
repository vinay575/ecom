import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Target, Eye, Users, TrendingUp, Award, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
  { year: "2020", event: "DigitalHub Founded", description: "Started with a vision to democratize digital product access" },
  { year: "2021", event: "1,000+ Products", description: "Reached our first major milestone with over 1,000 digital products" },
  { year: "2022", event: "Global Expansion", description: "Expanded to serve customers in over 50 countries" },
  { year: "2023", event: "AI Integration", description: "Launched AI-powered search and recommendations" },
  { year: "2024", event: "10,000+ Creators", description: "Built a thriving community of digital product creators" },
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We maintain the highest standards for every product on our marketplace, ensuring you get the best digital assets."
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Your data and transactions are protected with enterprise-grade security measures and encryption."
  },
  {
    icon: Zap,
    title: "Innovation Driven",
    description: "We continuously evolve our platform with cutting-edge technology to serve you better."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AnnouncementBar />
      <Header />
      <section className="py-12 md:py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">About DigitalHub</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Empowering creators and customers with the world's best digital marketplace
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-6xl mx-auto overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-48 sm:h-64 lg:h-auto">
                <img
                  src="/attached_assets/stock_images/professional_team_wo_e96463ec.jpg"
                  alt="Our Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6">Who We Are</h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-3 md:mb-4">
                  DigitalHub is the premier marketplace for digital products, connecting talented creators with customers worldwide. 
                  Since 2020, we've been dedicated to providing a secure, user-friendly platform where innovation meets accessibility.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 md:mb-6">
                  Our platform hosts thousands of high-quality digital products including UI kits, templates, plugins, graphics, 
                  and more. We believe in empowering both creators and customers, fostering a community built on trust, quality, and innovation.
                </p>
                <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">10K+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Creators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">100K+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">50+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To create the most trusted and innovative digital marketplace that empowers creators and 
                      provides customers with instant access to premium digital products.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become the global leader in digital product distribution, recognized for our commitment 
                      to quality, security, and customer satisfaction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6 items-start">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">
                        {item.year}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{item.event}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
