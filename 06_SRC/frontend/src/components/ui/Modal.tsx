import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUiStore } from '@/stores/ui.store';

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export function Modal({ title, children }: ModalProps) {
  const { isOpen, closeModal } = useUiStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg cursor-default"
          >
            <div className="p-6 relative">
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mt-4">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
