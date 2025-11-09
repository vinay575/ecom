import { motion } from "framer-motion";

export function OurStorySection() {
  const stats = [
    // { value: "50+", label: "AI Experts" },
    // { value: "100+", label: "Projects Delivered" },
    // { value: "10+", label: "Enterprise Partners" },
  ];

  return (
    <section className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Gradient Accent Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-indigo-500/5 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group">
              <img
                src="/attached_assets/stock_images/professional_team_wo_e96463ec.jpg"
                alt="Nano Flows AI Team"
                className="w-full h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Meet Nano Flows AI
            </h2>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              🚀 <span className="font-semibold text-gray-900 dark:text-white">Nano Flows AI Software Technologies Private Limited</span> — Where
              Innovation Flows Intelligently! Headquartered in{" "}
              <span className="font-medium text-indigo-600 dark:text-indigo-400">Visakhapatnam (Vizag)</span>,
              we are dedicated to redefining the future of{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Generative AI, Machine Learning, and Automation
              </span>.
            </p>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is simple yet transformative — to empower startups and enterprises
              with smart, scalable, and seamless AI-driven solutions. From intelligent{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                chatbots and workflow automation
              </span>{" "}
              to fully custom web and app development, we’re here to help businesses think,
              act, and grow intelligently.
            </p>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              With a bold launch on{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                November 1, 2025
              </span>
              , Nano Flows AI is not just building software — we’re crafting the future of
              intelligent business transformation. 💡🌐
            </p>

            {/* Stats */}
            <div className="pt-4 grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
