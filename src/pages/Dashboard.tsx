import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Droplets, Flame, Heart, TrendingUp, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import BentoCard from "@/components/BentoCard";
import { generateMockHistory, SkinMetrics, ScanRecord } from "@/lib/skinAnalysis";

const Dashboard = () => {
  const { latest, history } = useMemo(() => {
    // Try sessionStorage first
    const storedLatest = sessionStorage.getItem("skinlet-latest");
    const storedHistory = sessionStorage.getItem("skinlet-scans");

    const mockHistory = generateMockHistory();
    const allHistory: ScanRecord[] = storedHistory
      ? [
          ...mockHistory,
          ...JSON.parse(storedHistory).map((s: { id: string; date: string; metrics: SkinMetrics }) => ({
            ...s,
            date: new Date(s.date),
          })),
        ]
      : mockHistory;

    const latestMetrics: SkinMetrics = storedLatest
      ? JSON.parse(storedLatest)
      : mockHistory[mockHistory.length - 1].metrics;

    return { latest: latestMetrics, history: allHistory };
  }, []);

  const chartData = history.map((r) => ({
    date: new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    score: r.metrics.skinletScore,
    oil: r.metrics.oilPercentage,
    hydration: r.metrics.hydration,
  }));

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Your skin health at a glance</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <BentoCard
            icon={Zap}
            label="SkinletScore"
            value={latest.skinletScore}
            subtitle="out of 100"
            color="mint"
            delay={0.1}
          />
          <BentoCard
            icon={Flame}
            label="Acne Count"
            value={latest.acneCount}
            subtitle="spots detected"
            color="pink"
            delay={0.2}
          />
          <BentoCard
            icon={Droplets}
            label="Oil Level"
            value={`${latest.oilPercentage}%`}
            subtitle={latest.oilPercentage > 50 ? "above normal" : "in range"}
            delay={0.3}
          />
          <BentoCard
            icon={Heart}
            label="Hydration"
            value={`${latest.hydration}%`}
            subtitle={latest.hydration > 60 ? "well hydrated" : "needs attention"}
            color="mint"
            delay={0.4}
          />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-6 shadow-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-primary" />
              <h3 className="font-display font-semibold">Score Progress</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 55%, 42%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(160, 55%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 20%, 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 50%)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 50%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(150, 20%, 90%)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(160, 55%, 42%)"
                  strokeWidth={2}
                  fill="url(#scoreGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-3xl p-6 shadow-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} className="text-primary" />
              <h3 className="font-display font-semibold">Oil & Hydration</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 20%, 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 50%)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 50%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(150, 20%, 90%)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Line type="monotone" dataKey="oil" stroke="hsl(350, 70%, 65%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="hydration" stroke="hsl(200, 70%, 55%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded bg-accent" /> Oil
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded" style={{ background: "hsl(200, 70%, 55%)" }} /> Hydration
              </span>
            </div>
          </motion.div>
        </div>

        {/* Skin type summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-3xl p-6 shadow-card mt-4"
        >
          <h3 className="font-display font-semibold mb-2">Your Profile</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              {latest.skinType} Skin
            </span>
            {latest.concerns.map((c) => (
              <span key={c} className="bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                {c}
              </span>
            ))}
            <span className="bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium">
              Redness: {latest.rednessLevel}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
