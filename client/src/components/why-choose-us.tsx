import {
  Shield,
  Zap,
  HeadphonesIcon,
  Award,
  CheckCircle,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Bank-grade encryption ensures every transaction is private, secure, and trusted.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description:
      "Lightning-fast access to your products — no delays, no waiting screens.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our expert support team is available at all hours to assist you instantly.",
    color: "from-emerald-400 to-green-600",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "Every product is tested, verified, and optimized for superior performance.",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    icon: CheckCircle,
    title: "Money Back",
    description:
      "100% satisfaction guaranteed or your money back — no fine print.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: TrendingUp,
    title: "Regular Updates",
    description:
      "Always stay ahead — every product gets continuous feature upgrades.",
    color: "from-indigo-400 to-violet-600",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description:
      "Join a community of over 20,000 happy customers who rely on us daily.",
    color: "from-cyan-400 to-blue-600",
  },
  {
    icon: Sparkles,
    title: "Premium Selection",
    description:
      "Access the top 1% of digital tools, assets, and resources curated globally.",
    color: "from-amber-400 to-orange-500",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Crafted with precision and passion — experience technology that’s
            built to inspire confidence.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="rounded-xl h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300">
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    <div
                      className={`mb-4 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
