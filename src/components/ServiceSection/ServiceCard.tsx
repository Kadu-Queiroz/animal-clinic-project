import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: JSX.Element;
  items: string[];
  index: number;
  setOpenModalIndex: (index: number | null) => void;
}

export function ServiceCard({ title, icon, items, index, setOpenModalIndex }: ServiceCardProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group cursor-pointer relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-center mb-6 transform group-hover:scale-110 transition">{icon}</div>
      <h3 className="text-xl font-bold text-center mb-4 text-[#002B3D]">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="text-gray-600 flex items-center relative"
            onMouseEnter={() => setHoveredItem(idx)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="w-2 h-2 bg-[#002B3D] rounded-full mr-2"></div>
            <span className="relative">
              {item}
              {hoveredItem === idx && (
                <div className="absolute -top-8 left-0 bg-[#002B3D] text-white text-sm px-2 py-1 rounded-lg whitespace-nowrap">
                  Mais informações sobre {item}
                </div>
              )}
            </span>
          </li>
        ))}
      </ul>
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpenModalIndex(index)}
      >
        <MessageCircle className="w-6 h-6 text-[#002B3D]" />
      </motion.div>
    </motion.div>
  );
}