import { useState } from "react";
import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <AnnouncementBar />
      <Header />

      <main className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center mb-10">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: "hsl(23.95deg 95% 52.94%)" }}
          >
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or project in mind? We’d love to hear from you. Reach out and we’ll get back to you soon.
          </p>
        </div>

        {/* Modal-style container */}
        <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500">
          {/* Left side – Contact Info */}
          <div className="w-full lg:w-1/2 p-10 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between bg-gray-200 dark:bg-gray-900/90 transition-colors duration-300">
            <div>
              <h2
                className="text-2xl font-semibold mb-6"
               
              >
                Contact Information
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-400 mb-8">
                Reach out via email or phone, or visit us at our office. We’re always happy to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">support@digitalhub.com</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">sales@digitalhub.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mon–Fri, 9AM – 6PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">123 Market Street</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA 94103</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">Mon - Fri: 9AM - 6PM</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sat - Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019513748593!2d-122.39784268468208!3d37.78825797975711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right side – Contact Form */}
          <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="p-0 mb-4">
                <CardTitle
                  className="text-2xl font-semibold"
                  
                >
                  Send us a Message
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl border-gray-300 dark:border-gray-700 focus:border-[hsl(23.95deg_95%_52.94%)] focus:ring-[hsl(23.95deg_95%_52.94%)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-xl border-gray-300 dark:border-gray-700 focus:border-[hsl(23.95deg_95%_52.94%)] focus:ring-[hsl(23.95deg_95%_52.94%)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="rounded-xl border-gray-300 dark:border-gray-700 focus:border-[hsl(23.95deg_95%_52.94%)] focus:ring-[hsl(23.95deg_95%_52.94%)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="rounded-xl border-gray-300 dark:border-gray-700 focus:border-[hsl(23.95deg_95%_52.94%)] focus:ring-[hsl(23.95deg_95%_52.94%)]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 text-lg rounded-xl font-medium text-white"
                    style={{
                      backgroundColor: "hsl(23.95deg 95% 52.94%)",
                      boxShadow: "0 4px 10px rgba(255, 120, 50, 0.3)"
                    }}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
