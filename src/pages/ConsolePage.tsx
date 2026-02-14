import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeartParticles from "@/components/HeartParticles";
import ResultPanel from "@/components/ResultPanel";
import { HER_NAME, FINAL_MESSAGE } from "@/config/personalization";

const HINTS = [
  { query: "SELECT * FROM love;", description: "Find out what's stored…" },
  { query: `INSERT INTO heart VALUES ('${HER_NAME}');`, description: "Add someone special…" },
  { query: "UPDATE relationship SET status='Valentine';", description: "Change the status…" },
  { query: "COMMIT;", description: "Make it permanent…" },
];

const ConsolePage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [showValentine, setShowValentine] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [committed, setCommitted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRun = useCallback(() => {
    const q = query.toLowerCase().trim();

    if (q.includes("select") && q.includes("love")) {
      setResult(`1 record found: ${HER_NAME} ❤️`);
      setStep((s) => Math.max(s, 1));
      setShowValentine(false);
    } else if (q.includes("insert") && q.includes("heart")) {
      setResult("💖 Data successfully inserted into my heart.");
      setStep((s) => Math.max(s, 2));
      setShowValentine(false);
    } else if (q.includes("update") && q.includes("relationship")) {
      setResult("Updating relationship status…");
      setShowValentine(true);
      setStep((s) => Math.max(s, 3));
    } else if (q.includes("commit")) {
      if (accepted) {
        setCommitted(true);
        setResult(null);
        setShowValentine(false);
      } else {
        setResult("⚠️ Nothing to commit yet. Complete the previous steps first.");
      }
    } else {
      setResult("❌ Syntax error: Query not recognized. Check the hints!");
    }

    setQuery("");
  }, [query, accepted]);

  const handleYes = () => {
    setAccepted(true);
    setShowValentine(false);
    setResult("✅ Best decision ever executed successfully. Now type COMMIT; 🎉");
    setStep(3);
  };

  const handleNo = () => {
    setNoOffset({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
    setErrorText("ERROR: This option is not supported. 😏");
  };

  if (committed) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
        <HeartParticles />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        >
          <div className="text-6xl">💕</div>
          <h1 className="text-3xl font-bold glow-text text-foreground sm:text-5xl">
            Migration Completed Successfully
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">{FINAL_MESSAGE}</p>
          <div className="font-mono text-sm text-terminal-green">
            {">"} Transaction committed. 0 errors.
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg border border-border bg-secondary px-6 py-2 text-sm text-secondary-foreground"
          >
            Restart
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden p-4">
      <HeartParticles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Terminal Window */}
        <div className="overflow-hidden rounded-xl border border-border terminal-glow">
          {/* Title bar */}
          <div className="flex items-center gap-2 bg-terminal-header px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-accent/50" />
            <span className="h-3 w-3 rounded-full bg-primary/50" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              love_db — SQL Console
            </span>
          </div>

          {/* Editor area */}
          <div className="bg-card p-4">
            <div className="mb-2 font-mono text-xs text-muted-foreground">
              love_db={">"}{" "}
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleRun();
                }
              }}
              placeholder="Type your SQL query here…"
              className="w-full resize-none rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
              rows={3}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRun}
              className="mt-3 w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground glow-primary transition-all hover:brightness-110"
            >
              ▶ Run Query
            </motion.button>

            <ResultPanel
              result={result}
              showValentineQuestion={showValentine}
              onYes={handleYes}
              onNo={handleNo}
              noOffset={noOffset}
              errorText={errorText}
            />
          </div>
        </div>

        {/* Hints Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 rounded-xl border border-border bg-card/50 p-4"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            💡 Suggested Queries
          </p>
          <div className="space-y-2">
            {HINTS.map((hint, i) => (
              <motion.button
                key={hint.query}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.4 }}
                onClick={() => setQuery(hint.query)}
                className={`flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors ${
                  i < step
                    ? "bg-primary/10 border border-primary/20"
                    : i === step
                    ? "bg-secondary hover:bg-secondary/80"
                    : "opacity-40"
                }`}
                disabled={i > step}
              >
                <span className="mt-0.5 font-mono text-xs text-primary">
                  {i < step ? "✓" : `${i + 1}.`}
                </span>
                <div>
                  <code className="text-xs text-foreground">{hint.query}</code>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {hint.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConsolePage;
