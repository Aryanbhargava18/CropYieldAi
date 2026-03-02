import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const featureData = [
  { feature: "Rainfall (mm)", importance: 0.28, color: "hsl(145, 63%, 32%)" },
  { feature: "Temperature (°C)", importance: 0.22, color: "hsl(145, 63%, 38%)" },
  { feature: "Days to Harvest", importance: 0.18, color: "hsl(42, 87%, 50%)" },
  { feature: "Soil Type", importance: 0.12, color: "hsl(42, 87%, 58%)" },
  { feature: "Irrigation Used", importance: 0.08, color: "hsl(210, 70%, 50%)" },
  { feature: "Fertilizer Used", importance: 0.05, color: "hsl(210, 70%, 58%)" },
  { feature: "Weather Condition", importance: 0.04, color: "hsl(270, 50%, 55%)" },
  { feature: "Region", importance: 0.02, color: "hsl(270, 50%, 62%)" },
  { feature: "Crop Type", importance: 0.01, color: "hsl(0, 70%, 55%)" },
];

const FeatureImportance = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-badge bg-secondary/15 border border-secondary/25 mb-5 mx-auto w-fit">
            <Lightbulb className="w-4 h-4 text-secondary" />
            <span className="text-secondary-foreground font-medium">Feature Analysis</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Feature Importance Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Identifying the most influential factors in crop yield prediction
            using model feature importances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card-elevated p-6 lg:col-span-2">
            <h3 className="font-semibold font-sans text-card-foreground mb-6 text-lg">Feature Importance Scores</h3>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={featureData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(80 15% 88% / 0.6)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(150 10% 45%)' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="feature" type="category" tick={{ fontSize: 12, fill: 'hsl(150 10% 45%)' }} width={130} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100% / 0.95)",
                    border: "1px solid hsl(80 15% 88%)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px -8px hsl(150 30% 10% / 0.1)",
                  }}
                  formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "Importance"]}
                />
                <Bar dataKey="importance" radius={[0, 8, 8, 0]} barSize={24}>
                  {featureData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="space-y-5">
            <Card className="glass-card p-6">
              <h4 className="font-semibold font-sans text-card-foreground mb-4 text-base">Key Insights</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span><strong className="text-card-foreground">Rainfall</strong> is the most critical factor, contributing 28% to yield prediction.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span><strong className="text-card-foreground">Temperature</strong> and <strong className="text-card-foreground">Days to Harvest</strong> together account for 40%.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-chart-blue mt-1.5 shrink-0" />
                  <span><strong className="text-card-foreground">Soil type</strong> plays a significant role due to water retention.</span>
                </li>
              </ul>
            </Card>

            <Card className="glass-card p-6">
              <h4 className="font-semibold font-sans text-card-foreground mb-4 text-base">Preprocessing Pipeline</h4>
              <div className="space-y-3 text-sm">
                {[
                  "One-hot encoding (categorical features)",
                  "Standard scaling (numerical features)",
                  "Train-test split (90/10)",
                  "Scikit-learn Pipeline integration",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureImportance;
