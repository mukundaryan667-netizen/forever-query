import { motion, AnimatePresence } from "framer-motion";
import { HER_NAME } from "@/config/personalization";

interface ResultPanelProps {
  result: string | null;
  showValentineQuestion: boolean;
  onYes: () => void;
  onNo: () => void;
  noOffset: { x: number; y: number };
  errorText: string | null;
}

const ResultPanel = ({
  result,
  showValentineQuestion,
  onYes,
  onNo,
  noOffset,
  errorText,
}: ResultPanelProps) => {
  return (
    <div className="mt-4 min-h-[120px]">
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-lg border border-border bg-secondary/50 p-4 font-mono text-sm"
          >
            <span className="text-terminal-green">{">"}</span>{" "}
            <span className="text-foreground">{result}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showValentineQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl font-bold glow-text text-foreground sm:text-3xl">
              Will you be my Valentine, {HER_NAME}? 💕
            </h2>
            <div className="flex gap-4 items-center relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onYes}
                className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground glow-primary"
              >
                YES 💖
              </motion.button>
              <motion.button
                animate={{ x: noOffset.x, y: noOffset.y }}
                onHoverStart={onNo}
                className="rounded-lg border border-border bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition-colors"
              >
                NO
              </motion.button>
            </div>
            <AnimatePresence>
              {errorText && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-destructive"
                >
                  {errorText}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultPanel;
