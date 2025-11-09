import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Announcement {
  id: string;
  content: string;
  link?: string;
  type: "info" | "promo" | "warning";
}

export function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
      return;
    }

    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setAnnouncements(data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
  };

  if (!isVisible || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  const bgColors = {
    info: "bg-blue-600",
    promo: "bg-gradient-to-r from-indigo-600 to-purple-600",
    warning: "bg-amber-500",
  };

  return (
    <div className={`${bgColors[currentAnnouncement.type]} text-white relative`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {currentAnnouncement.link ? (
                  <a
                    href={currentAnnouncement.link}
                    className="text-sm font-medium hover:underline"
                  >
                    {currentAnnouncement.content}
                  </a>
                ) : (
                  <p className="text-sm font-medium">{currentAnnouncement.content}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {announcements.length > 1 && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {announcements.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 w-1 rounded-full ${
                idx === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
