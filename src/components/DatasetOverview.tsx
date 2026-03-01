import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { name: "Region", type: "Categorical", values: "North, East, South, West", desc: "Geographical region" },
  { name: "Soil_Type", type: "Categorical", values: "Clay, Sandy, Loam, Silt, Peaty, Chalky", desc: "Soil classification" },
  { name: "Crop", type: "Categorical", values: "Wheat, Rice, Maize, Barley, Soybean, Cotton", desc: "Crop type grown" },
  { name: "Rainfall_mm", type: "Numerical", values: "Continuous", desc: "Rainfall in mm" },
  { name: "Temperature_Celsius", type: "Numerical", values: "Continuous", desc: "Avg. temperature (°C)" },
  { name: "Fertilizer_Used", type: "Boolean", values: "True / False", desc: "Whether fertilizer applied" },
  { name: "Irrigation_Used", type: "Boolean", values: "True / False", desc: "Whether irrigation used" },
  { name: "Weather_Condition", type: "Categorical", values: "Sunny, Rainy, Cloudy, Stormy", desc: "Weather during growth" },
  { name: "Days_to_Harvest", type: "Numerical", values: "Continuous", desc: "Days until harvest" },
  { name: "Yield_tons_per_hectare", type: "Target", values: "Continuous", desc: "Yield (tons/hectare)" },
];

const typeBadge: Record<string, string> = {
  Target: "bg-primary/10 text-primary border border-primary/20",
  Numerical: "bg-chart-blue/10 text-chart-blue border border-chart-blue/20",
  Boolean: "bg-secondary/10 text-secondary border border-secondary/20",
  Categorical: "bg-muted text-muted-foreground border border-border",
};

const DatasetOverview = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-badge bg-primary/10 border border-primary/20 mb-5 mx-auto w-fit">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Data Source</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Dataset Overview
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Agriculture Crop Yield dataset with 1,000,000 samples from Kaggle.
          </p>
        </div>

        <Card className="glass-card-elevated overflow-hidden max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold text-foreground">Feature</TableHead>
                  <TableHead className="font-semibold text-foreground">Type</TableHead>
                  <TableHead className="font-semibold text-foreground">Values</TableHead>
                  <TableHead className="font-semibold text-foreground">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((f) => (
                  <TableRow key={f.name} className="hover:bg-muted/20">
                    <TableCell className="font-mono-code text-sm font-medium text-card-foreground">{f.name}</TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${typeBadge[f.type] || typeBadge.Categorical}`}>
                        {f.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{f.values}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{f.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-5 border-t border-border/50 flex justify-center bg-muted/10">
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
              onClick={() => window.open("https://www.kaggle.com/datasets/samuelotiattakorah/agriculture-crop-yield", "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              View on Kaggle
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DatasetOverview;
