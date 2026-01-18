import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, LayoutDashboard, BarChart3, BrainCircuit, GanttChart, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/scenarios', icon: BarChart3, label: 'Scenarios' },
  { to: '/ideation', icon: BrainCircuit, label: 'Ideation' },
  { to: '/roadmaps', icon: GanttChart, label: 'Roadmaps' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const sidebarVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // Each child will animate 0.05s after the previous one
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-white sm:flex">
      <nav className="flex flex-col gap-4 px-4 py-6">
        <Link to="/" className="group flex h-9 w-full items-center justify-center rounded-lg bg-black text-lg font-semibold text-white md:h-8 md:text-base mb-4">
          <Rocket className="h-6 w-6 transition-all group-hover:scale-110 group-hover:rotate-12" />
          <span className="ml-2">Strata-AI</span>
        </Link>

        <motion.div
          className="flex flex-col gap-2"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => (
            <motion.div key={item.label} variants={navItemVariants}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900 font-medium ${pathname === item.to ? 'bg-gray-100 text-gray-900' : ''}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </nav>
    </aside>
  );
}
