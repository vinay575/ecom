import { useState, type ElementType } from "react";
import { Header } from "@/components/header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Tag, Calendar, TrendingDown, Sparkles, Gift, X, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Deal {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  discount: string;
  code?: string;
  validUntil: string;
  icon: ElementType;
  gradient: string;
  borderColor: string;
}

export default function DealsPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const deals: Deal[] = [
    {
      id: 1,
      title: "New Year Sale",
      subtitle: "Up to 50% off",
      description: "Start 2026 with amazing savings on all digital products!",
      details: "Get up to 50% off on all digital products including UI kits, templates, plugins, and more. This is our biggest sale of the year!",
      discount: "50%",
      validUntil: "Valid until Jan 31, 2026",
      icon: TrendingDown,
      gradient: "from-orange-500 to-red-600",
      borderColor: "border-orange-500"
    },
    {
      id: 2,
      title: "Bundle Deals",
      subtitle: "Save more together",
      description: "Purchase multiple products and get extra discounts!",
      details: "Buy 2 products and get 15% off, buy 3+ products and get 25% off! Mix and match any products from our marketplace.",
      discount: "25%",
      validUntil: "Ongoing",
      icon: Gift,
      gradient: "from-amber-500 to-orange-600",
      borderColor: "border-amber-500"
    },
    {
      id: 3,
      title: "First Purchase",
      subtitle: "10% off with code",
      description: "New to our marketplace? Get 10% off your first order!",
      details: "Welcome to our marketplace! Use the code WELCOME10 at checkout to get 10% off your first purchase. Valid on all products.",
      discount: "10%",
      code: "WELCOME10",
      validUntil: "New customers only",
      icon: Sparkles,
      gradient: "from-red-500 to-orange-600",
      borderColor: "border-red-500"
    }
  ];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <AnnouncementBar />
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white mb-6 shadow-xl">
              <Tag className="h-10 w-10" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Special Deals
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on our exclusive deals and limited-time offers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`border-2 ${deal.borderColor} hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative`}
                  onClick={() => setSelectedDeal(deal)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${deal.gradient} shadow-lg`}>
                        <deal.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">{deal.title}</CardTitle>
                          <Badge className={`bg-gradient-to-r ${deal.gradient} text-white border-0 text-lg px-3 py-1`}>
                            {deal.discount}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">{deal.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground mb-6">
                      {deal.description}
                    </p>
                    {deal.code && (
                      <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Use code:</p>
                        <p className="font-mono font-bold text-orange-600 text-lg">{deal.code}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-orange-600 font-medium">
                        <Calendar className="h-4 w-4" />
                        {deal.validUntil}
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl max-w-4xl mx-auto border border-orange-200 dark:border-orange-800"
          >
            <Tag className="h-8 w-8 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Check back regularly for new deals!</h3>
            <p className="text-muted-foreground">
              We add new seasonal offers and exclusive promotions throughout the year
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />

      <Dialog open={!!selectedDeal} onOpenChange={() => setSelectedDeal(null)}>
        <AnimatePresence>
          {selectedDeal && (
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-2 border-orange-500">
              <div className={`bg-gradient-to-br ${selectedDeal.gradient} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <button 
                  onClick={() => setSelectedDeal(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative">
                  <Badge className="bg-white/20 text-white border-0 mb-4">
                    Save {selectedDeal.discount}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-white mb-2">
                      {selectedDeal.title}
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-white/90 text-lg">
                    {selectedDeal.subtitle}
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  {selectedDeal.details}
                </p>

                {selectedDeal.code && (
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Discount Code</label>
                    <div className="flex gap-2">
                      <div className="flex-1 p-4 bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-200 dark:border-orange-800 rounded-lg">
                        <p className="font-mono font-bold text-orange-600 text-xl text-center">
                          {selectedDeal.code}
                        </p>
                      </div>
                      <Button
                        size="lg"
                        onClick={() => copyCode(selectedDeal.code!)}
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="h-5 w-5 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-5 w-5 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-6">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Validity</p>
                    <p className="font-semibold">{selectedDeal.validUntil}</p>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-lg"
                  onClick={() => setSelectedDeal(null)}
                >
                  Start Shopping
                </Button>
              </div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
