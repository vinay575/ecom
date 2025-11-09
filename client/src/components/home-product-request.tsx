import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Lightbulb, Send, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function HomeProductRequest() {
  const [productName, setProductName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const requestMutation = useMutation({
    mutationFn: async (data: {
      productName: string;
      email: string;
      message?: string;
    }) => {
      const res = await fetch("/api/product-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit request");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "We'll review your suggestion and get back to you soon.",
      });
      setProductName("");
      setEmail("");
      setMessage("");
      setDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestMutation.mutate({ productName, email, message });
  };

  return (
    <section className="relative py-10 bg-gradient-to-b from-white  dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Left Text Content */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-600 to-orange-500 shadow-sm">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                Have a Product Idea?
              </h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 max-w-2xl">
              Can’t find the product you need? Let us know what you're looking for —
              we’re constantly expanding our collection with community ideas.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Whether it’s a UI Kit, plugin, or AI tool, your suggestion could become our next release.
            </p>
          </div>

          {/* Right Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-orange-500 hover:from-indigo-700 hover:to-orange-600 text-sm px-5 py-2.5 rounded-md shadow-sm hover:shadow-md transition-all whitespace-nowrap"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Request Product
              </Button>
            </DialogTrigger>

            {/* Compact Modal */}
            <DialogContent className="max-w-md w-full rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-900 p-5 sm:p-6">
              <DialogHeader className="text-left mb-2">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Request a Product
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Share your product idea — it could be the next big thing.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="productName"
                    placeholder="e.g. AI Resume Builder"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="h-8 text-sm rounded-md border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-8 text-sm rounded-md border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300"
                  >
                    Details (optional)
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Briefly describe your idea..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className="text-sm rounded-md border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    💡 Your feedback helps us build what creators truly need.
                  </p>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-gradient-to-r from-indigo-600 to-orange-500 hover:from-indigo-700 hover:to-orange-600 text-xs px-4 py-1.5 rounded-md"
                    disabled={requestMutation.isPending}
                  >
                    {requestMutation.isPending ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 mr-1" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
