import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Tag, Calendar, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DealsPage() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4">
              <Tag className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Special Deals</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on our exclusive deals and limited-time offers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="border-2 border-indigo-500">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>New Year Sale</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Up to 50% off</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Start 2026 with amazing savings on all digital products!
                </p>
                <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                  <Calendar className="h-4 w-4" />
                  Valid until Jan 31, 2026
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Tag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Bundle Deals</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Save more together</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Purchase multiple products and get extra discounts!
                </p>
                <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                  <Calendar className="h-4 w-4" />
                  Ongoing
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Tag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>First Purchase</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">10% off with code</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Use code <span className="font-mono font-semibold">WELCOME10</span> for 10% off your first order!
                </p>
                <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                  <Calendar className="h-4 w-4" />
                  New customers only
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Check back regularly for new deals and seasonal offers
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
