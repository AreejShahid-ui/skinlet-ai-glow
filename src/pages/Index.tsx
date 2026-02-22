import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scan, Sparkles, Shield, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Scan, title: "AI Skin Analysis", desc: "Advanced face detection with real-time metrics" },
  { icon: Sparkles, title: "K-Beauty Picks", desc: "Curated product recommendations for your skin" },
  { icon: TrendingUp, title: "Track Progress", desc: "Monitor your skin health over time" },
  { icon: Shield, title: "SkinletScore™", desc: "Proprietary score for overall skin health" },
];

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 shadow-glass"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Skincare</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
            Your Skin,{" "}
            <span className="text-primary">Decoded</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Discover your unique skin profile with AI analysis and get personalized K-Beauty recommendations tailored just for you.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <Link
              to="/scan"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-glass hover:shadow-elevated transition-all duration-300 hover:scale-105"
            >
              <Scan size={20} />
              Start Analysis
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-3 glass text-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-card hover:shadow-elevated transition-all duration-300"
            >
              View Dashboard
            </Link>
          </motion.div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl w-full pb-12"
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="glass rounded-3xl p-5 text-center shadow-card hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="inline-flex p-3 rounded-2xl bg-muted mb-3 group-hover:bg-primary/10 transition-colors">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
