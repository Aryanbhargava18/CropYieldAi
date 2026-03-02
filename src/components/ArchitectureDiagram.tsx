import { Card } from "@/components/ui/card";
import { BarChart3, Monitor, ArrowRight, FileSpreadsheet, Cog, Brain, Layers } from "lucide-react";

const steps = [
  {
    icon: FileSpreadsheet,
    title: "Data Ingestion",
    desc: "CSV upload with soil, weather, and crop data",
    accent: "primary",
  },
  {
    icon: Cog,
    title: "Preprocessing",
    desc: "Scaling, encoding, missing value handling",
    accent: "secondary",
  },
  {
    icon: Brain,
    title: "ML Models",
    desc: "Linear Regression",
    accent: "primary",
  },
  {
    icon: BarChart3,
    title: "Evaluation",
    desc: "MAE, RMSE, R² metrics & feature importance",
    accent: "chart-purple",
  },
  {
    icon: Monitor,
    title: "UI Display",
    desc: "Interactive prediction form & visualizations",
    accent: "success",
  },
];

const accentStyles: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  "chart-purple": "bg-chart-purple/10 text-chart-purple border-chart-purple/20",
  success: "bg-success/10 text-success border-success/20",
};

const ArchitectureDiagram = () => {
  return (
    <section className="py-24" style={{ background: "var(--gradient-section)" }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-badge bg-primary/10 border border-primary/20 mb-5 mx-auto w-fit">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">System Design</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            System Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end pipeline from raw agricultural data to yield predictions.
          </p>
        </div>

        {/* Pipeline flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 max-w-6xl mx-auto mb-16">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 w-full md:w-auto">
              <Card className="glass-card-elevated p-6 text-center flex-1 md:w-52">
                <div className={`w-14 h-14 rounded-2xl ${accentStyles[step.accent]} flex items-center justify-center mx-auto mb-4 border`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <h4 className="font-semibold font-sans text-card-foreground text-sm mb-1.5">{step.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </Card>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground/40 shrink-0 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground font-sans mb-6">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Python", color: "bg-chart-blue/10 text-chart-blue border-chart-blue/20" },
              { name: "Scikit-Learn", color: "bg-secondary/10 text-secondary border-secondary/20" },
              { name: "Pandas", color: "bg-primary/10 text-primary border-primary/20" },
              { name: "NumPy", color: "bg-chart-blue/10 text-chart-blue border-chart-blue/20" },
              { name: "React", color: "bg-chart-blue/10 text-chart-blue border-chart-blue/20" },
              { name: "TypeScript", color: "bg-chart-blue/10 text-chart-blue border-chart-blue/20" },
              { name: "Tailwind CSS", color: "bg-primary/10 text-primary border-primary/20" },
              { name: "Recharts", color: "bg-chart-purple/10 text-chart-purple border-chart-purple/20" },
            ].map((tech) => (
              <span
                key={tech.name}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border ${tech.color} transition-transform hover:scale-105`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
