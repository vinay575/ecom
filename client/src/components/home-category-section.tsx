import { Palette, Code, Puzzle, Wand2, FileCode, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const categories = [
  { icon: Palette, name: "UI Kits", count: 1200, color: "from-blue-500 to-indigo-500", href: "/products?category=UI+Kits" },
  { icon: Code, name: "Templates", count: 850, color: "from-green-500 to-emerald-500", href: "/products?category=Templates" },
  { icon: Puzzle, name: "Plugins", count: 640, color: "from-purple-500 to-pink-500", href: "/products?category=Plugins" },
  { icon: Wand2, name: "AI Tools", count: 320, color: "from-orange-500 to-amber-500", href: "/products?category=AI+Tools" },
  { icon: FileCode, name: "Code Scripts", count: 580, color: "from-yellow-500 to-orange-400", href: "/products?category=Code+Scripts" },
  { icon: Smartphone, name: "Mobile Apps", count: 290, color: "from-pink-500 to-rose-500", href: "/products?category=Mobile+Apps" },
];

export function HomeCategorySection() {
  return (
    <section className="relative py-8 bg-gray-100 dark:bg-gray-900/50 dark:from-gray-950 overflow-hidden">
      {/* Subtle gradient accent background */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Browse by Category
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of digital tools and assets.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.a
                key={category.name}
                href={category.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="block"
              >
                <Card className="flex flex-col items-center gap-3 p-5 text-center rounded-xl bg-white dark:bg-gray-900 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-gray-200 dark:border-gray-800 transition-all duration-300">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {category.count}+ items
                    </p>
                  </div>
                </Card>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
