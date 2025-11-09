import { CheckCircle2, Star, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HomeAboutSection() {
  return (
    <section className="py-6 md:py-10 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">
            Who We Are
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            DigitalHub is your trusted destination for premium digital products.
            We connect creators with customers, offering everything from software and templates
            to courses and digital art.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  To democratize access to quality digital products and empower creators
                  to monetize their skills while providing exceptional value to customers worldwide.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Our Vision</h3>
                <p className="text-sm text-muted-foreground">
                  To become the world's most trusted digital marketplace,
                  fostering innovation and creativity while maintaining the highest
                  standards of quality and customer satisfaction.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "hsl(23.95deg 95% 52.94%)" }}>
            Why Choose Us?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-lg p-5 border hover:border-indigo-500 transition-colors group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 mb-3 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-base font-bold mb-1">100% Secure</h3>
              <p className="text-sm text-muted-foreground">
                All transactions are encrypted and your data is protected with industry-leading security.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg p-5 border hover:border-orange-500 transition-colors group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-3 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-base font-bold mb-1">Instant Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Get your digital products immediately after purchase. No waiting, no delays.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-lg p-5 border hover:border-green-500 transition-colors group sm:col-span-2 lg:col-span-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-3 group-hover:scale-110 transition-transform">
                <Star className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-base font-bold mb-1">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Every product is carefully curated to ensure the highest quality and value.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
