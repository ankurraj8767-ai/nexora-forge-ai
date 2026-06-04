import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Toast() {
  const { toast, clearToast } = useStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    error: 'text-red-400 border-red-500/20 bg-red-500/10',
    info: 'text-neon-cyan border-neon-cyan/20 bg-neon-cyan/10',
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <div className={`glass rounded-xl px-4 py-3 border ${colors[toast.type]} flex items-center gap-3 shadow-xl`}>
            {(() => {
              const Icon = icons[toast.type];
              return <Icon className="w-5 h-5 flex-shrink-0" />;
            })()}
            <p className="text-sm font-medium text-white">{toast.message}</p>
            <button
              onClick={clearToast}
              className="ml-2 p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
