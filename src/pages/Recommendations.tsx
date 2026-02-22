import { useMemo } from "react";
import { motion } from "framer-motion";
import { Droplets, Sparkles, Leaf, Droplet, Heart, Moon, Sun, ShoppingBag } from "lucide-react";
import { analyzeSkin, getRecommendations, SkinMetrics, Product } from "@/lib/skinAnalysis";

const iconMap: Record<string, React.ElementType> = {
  droplets: Droplets,
  sparkles: Sparkles,
  leaf: Leaf,
  droplet: Droplet,
  heart: Heart,
  moon: Moon,
  sun: Sun,
};

const Recommendations = () => {
  const { metrics, products } = useMemo(() => {
    const stored = sessionStorage.getItem("skinlet-latest");
    const m: SkinMetrics = stored ? JSON.parse(stored) : analyzeSkin();
    return { metrics: m, products: getRecommendations(m) };
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold mb-1">Your Routine</h1>
          <p className="text-muted-foreground">
            Personalized K-Beauty picks for {metrics.skinType.toLowerCase()} skin
          </p>
        </motion.div>

        {/* AM/PM label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <ShoppingBag size={16} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Recommended Routine</span>
        </motion.div>

        <div className="space-y-3">
          {products.map((product, i) => {
            const Icon = iconMap[product.icon] || Sparkles;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="glass rounded-3xl p-5 shadow-card hover:shadow-elevated transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="p-3 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {product.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{product.brand}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{product.reason}</p>
                </div>
                <div className="text-xs font-display font-bold text-muted-foreground shrink-0 pt-1">
                  Step {i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 glass rounded-3xl p-6 shadow-card text-center"
        >
          <Sparkles size={20} className="text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Pro Tip:</strong> Apply products from thinnest to thickest consistency. Always finish with sunscreen in the morning! ☀️
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;
