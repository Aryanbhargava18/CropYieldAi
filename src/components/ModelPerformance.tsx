import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import { Activity, TrendingUp, Target, BarChart3, CheckCircle2 } from "lucide-react";

const metricsData = [
  { model: "Linear Reg.", MAE: 1.82, RMSE: 2.15, R2: 0.42 },
  { model: "Decision Tree", MAE: 0.95, RMSE: 1.28, R2: 0.78 },
];

const radarData = [
  { metric: "MAE", "Decision Tree": 75, "Linear Reg.": 52 },
  { metric: "RMSE", "Decision Tree": 72, "Linear Reg.": 48 },
  { metric: "R²", "Decision Tree": 78, "Linear Reg.": 42 },
  { metric: "Train Speed", "Decision Tree": 85, "Linear Reg.": 95 },
  { metric: "Interpretability", "Decision Tree": 90, "Linear Reg.": 95 },
];

const MetricCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  highlight,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  subtitle: string;
  highlight?: boolean;
}) => (
  <Card className={`glass-card p-6 text-center group transition-all ${highlight ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
    <div className={`w-10 h-10 rounded-xl ${highlight ? 'bg-primary/15' : 'bg-muted'} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-5 h-5 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
    <div className="text-3xl font-bold font-sans text-card-foreground tracking-tight">{value}</div>
    <div className="text-sm font-medium text-card-foreground mt-1">{label}</div>
    <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
  </Card>
);

const ModelPerformance = () => {
  return (
    <section id="model-performance" className="py-24" style={{ background: "var(--gradient-section)" }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-badge bg-primary/10 border border-primary/20 mb-5 mx-auto w-fit">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-primary">Model Evaluation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Model Performance Metrics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comparison of Linear Regression and Decision Tree models
            evaluated on MAE, RMSE, and R² metrics.
          </p>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <MetricCard icon={TrendingUp} label="Best MAE" value="0.95" subtitle="Decision Tree" highlight />
          <MetricCard icon={BarChart3} label="Best RMSE" value="1.28" subtitle="Decision Tree" />
          <MetricCard icon={CheckCircle2} label="Models Tested" value="2" subtitle="Classical ML" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="glass-card-elevated p-6">
            <h3 className="font-semibold font-sans text-card-foreground mb-6 text-lg">Error Metrics Comparison</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={metricsData} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(80 15% 88% / 0.6)" vertical={false} />
                <XAxis dataKey="model" tick={{ fontSize: 12, fill: 'hsl(150 10% 45%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(150 10% 45%)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100% / 0.95)",
                    border: "1px solid hsl(80 15% 88%)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px -8px hsl(150 30% 10% / 0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                />
                <Bar dataKey="MAE" fill="hsl(145, 63%, 32%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="RMSE" fill="hsl(42, 87%, 55%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="R2" fill="hsl(210, 70%, 50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Radar Chart */}
          <Card className="glass-card-elevated p-6">
            <h3 className="font-semibold font-sans text-card-foreground mb-6 text-lg">Model Comparison Radar</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(80 15% 88% / 0.6)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'hsl(150 10% 45%)' }} />
                <PolarRadiusAxis tick={{ fontSize: 10, fill: 'hsl(150 10% 45%)' }} />
                <Radar name="Decision Tree" dataKey="Decision Tree" stroke="hsl(42, 87%, 55%)" fill="hsl(42, 87%, 55%)" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Linear Reg." dataKey="Linear Reg." stroke="hsl(210, 70%, 50%)" fill="hsl(210, 70%, 50%)" fillOpacity={0.1} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ModelPerformance;
