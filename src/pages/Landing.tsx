import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeartParticles from "@/components/HeartParticles";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <HeartParticles />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        {/* Glowing orb behind title */}
        <div className="absolute -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

        <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          <span>SYSTEM ACTIVE</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl glow-text text-foreground">
          Data Migration in Progress…
        </h1>

        <p className="max-w-md text-lg text-muted-foreground">
          Moving data from{" "}
          <span className="text-primary font-mono">'Strangers'</span> to{" "}
          <span className="text-primary font-mono">'Forever'</span>
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/console")}
          className="mt-4 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground glow-primary transition-all hover:brightness-110"
        >
          {">"} Start Migration
        </motion.button>

        <div className="mt-8 font-mono text-xs text-muted-foreground/50">
          <span className="animate-blink">█</span> Awaiting operator input…
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
