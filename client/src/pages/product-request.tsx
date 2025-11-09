import { useState } from "react";
import { Send, Lightbulb, Package, Sparkles, MessageSquare } from "lucide-react";
import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ProductRequestPage() {
  const [formData, setFormData] = useState({
    productName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/product-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setIsOpen(false);
        toast({
          title: "Request Submitted!",
          description: data.message || "We'll notify you when the product becomes available.",
        });
        setFormData({ productName: "", email: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit product request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Package,
      title: "Wide Selection",
      description: "We offer thousands of high-quality digital products across various categories."
    },
    {
      icon: Sparkles,
      title: "Custom Requests",
      description: "Can't find what you need? Request it and we'll work to add it to our marketplace."
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Stay informed with updates about your requested products via email."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AnnouncementBar />
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Product</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Can't find what you're looking for? Let us know what you need, and we'll work to add it to our marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-6">
                  <Lightbulb className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Have a Product in Mind?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Share your product idea with us. Whether it's a specific template, UI kit, plugin, or tool, 
                  we're here to help bring the right products to our marketplace.
                </p>
                
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="gap-2">
                      <Send className="h-5 w-5" />
                      Submit Product Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Request a Product</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and we'll notify you when your requested product becomes available.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name *</Label>
                        <Input
                          id="productName"
                          placeholder="e.g., Premium React Dashboard"
                          value={formData.productName}
                          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Details</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about what you're looking for..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsOpen(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="flex-1 gap-2">
                          {isLoading ? "Submitting..." : (
                            <>
                              <Send className="h-4 w-4" />
                              Submit
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                {isSubmitted && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      ✓ Thank you! We've received your request and will notify you via email.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <Lightbulb className="h-5 w-5" />
                Pro Tip
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Before requesting a product, try browsing our marketplace or using the search feature. 
                You might find exactly what you need or discover even better alternatives!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
