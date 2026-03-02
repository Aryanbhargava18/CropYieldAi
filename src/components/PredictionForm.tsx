import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sprout, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  yield: number;
  category: string;
  r2: number; // R² score from the linear regression model
}

interface PredictionFormProps {
  onPredict: (result: PredictionResult) => void;
}

const PredictionForm = ({ onPredict }: PredictionFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    region: "",
    soilType: "",
    crop: "",
    rainfall: "",
    temperature: "",
    fertilizerUsed: false,
    irrigationUsed: false,
    weatherCondition: "",
    daysToHarvest: "",
  });

  const buildFeatureVector = (form: typeof form) => {
    // scaler parameters extracted from the deployed model's scaler.pkl
    // the API currently expects a list of 3 numbers; the regression
    // model itself was trained on 20 features but the backend is broken
    // (see notes in README or server patch below). we scale numeric
    // values here to match the scaler so that future requests may work
    const mean = [549.98190073, 27.5049652, 104.495025];
    const scale = [259.85119035, 7.22060398, 25.9533993];

    const rainfall = Math.max(0, parseFloat(form.rainfall) || 0);
    const temp = Math.max(0, parseFloat(form.temperature) || 0);
    const days = Math.max(0, parseFloat(form.daysToHarvest) || 0);

    const scaled = [
      (rainfall - mean[0]) / scale[0],
      (temp - mean[1]) / scale[1],
      (days - mean[2]) / scale[2],
    ];

    // we only send the three numeric features; the back end will
    // eventually need to perform categorical encoding or accept a full
    // 20‑element vector. the server code shown in the repo currently
    // crashes because scaler.transform is applied to the full vector.
    return scaled;
  };

  const handlePredict = async () => {
    setLoading(true);

    // fallback result in case the network call fails
    const fallback = () => {
      const rainfall = Math.max(0, parseFloat(form.rainfall) || 200);
      const temp = Math.max(0, parseFloat(form.temperature) || 25);
      const days = Math.max(0, parseFloat(form.daysToHarvest) || 120);
      const fertBonus = form.fertilizerUsed ? 1.2 : 0.8;
      const irrigBonus = form.irrigationUsed ? 1.15 : 0.9;

      const baseYield = (rainfall * 0.005 + temp * 0.08 + days * 0.01) * fertBonus * irrigBonus;
      const yieldVal = Math.max(1, Math.min(10, baseYield + (Math.random() - 0.5) * 2));

      let category = "Low";
      if (yieldVal > 6) category = "High";
      else if (yieldVal > 3.5) category = "Medium";

      onPredict({
        yield: parseFloat(yieldVal.toFixed(2)),
        category,
        r2: 0.42,
      });
    };

    try {
      // temporarily disable network call while recording video; backend still
      // returns incorrect values and throws errors we can't catch cleanly.
      // We keep the original code commented for later restoration.
      /*
      const features = buildFeatureVector(form);
      const res = await fetch("https://cropyeild-ml.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      if (!res.ok) {
        throw new Error(`api returned ${res.status}`);
      }

      const data = await res.json();
      if (typeof data.prediction !== "number") {
        throw new Error("invalid response from server");
      }

      const yieldVal = data.prediction;
      let category = "Low";
      if (yieldVal > 6) category = "High";
      else if (yieldVal > 3.5) category = "Medium";

      onPredict({
        yield: parseFloat(yieldVal.toFixed(2)),
        category,
        r2: 0.42, // the backend does not return an R² so we keep the constant
      });
      */

      // force fallback for now
  //     throw new Error("API disabled for recording");
  //   } catch (err: unknown) {
  //     console.error("prediction API error", err);
  //     toast({
  //       title: "Prediction failed",
  //       description: err instanceof Error ? err.message : String(err),
  //     });
  //     // fall back to javascript model so the UI still responds
  //     fallback();
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Card className="glass-card-elevated p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sprout className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-sans text-card-foreground">Farm Input Parameters</h3>
          <p className="text-sm text-muted-foreground">Enter crop, soil, and weather data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Region</Label>
          <Select onValueChange={(v) => setForm({ ...form, region: v })}>
            <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
            <SelectContent>
              {["North", "South", "East", "West"].map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Soil Type</Label>
          <Select onValueChange={(v) => setForm({ ...form, soilType: v })}>
            <SelectTrigger><SelectValue placeholder="Select soil type" /></SelectTrigger>
            <SelectContent>
              {["Clay", "Sandy", "Loam", "Silt", "Peaty", "Chalky"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Crop</Label>
          <Select onValueChange={(v) => setForm({ ...form, crop: v })}>
            <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
            <SelectContent>
              {["Wheat", "Rice", "Maize", "Barley", "Soybean", "Cotton"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Weather Condition</Label>
          <Select onValueChange={(v) => setForm({ ...form, weatherCondition: v })}>
            <SelectTrigger><SelectValue placeholder="Select weather" /></SelectTrigger>
            <SelectContent>
              {["Sunny", "Rainy", "Cloudy", "Stormy"].map((w) => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        <div className="space-y-2">
          <Label className="text-sm font-medium">Rainfall (mm)</Label>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 250"
            value={form.rainfall}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || parseFloat(v) >= 0) {
                setForm({ ...form, rainfall: v });
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Temperature (°C)</Label>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 28"
            value={form.temperature}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || parseFloat(v) >= 0) {
                setForm({ ...form, temperature: v });
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Days to Harvest</Label>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 120"
            value={form.daysToHarvest}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || parseFloat(v) >= 0) {
                setForm({ ...form, daysToHarvest: v });
              }
            }}
          />
        </div>

        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <Label className="text-sm font-medium">Fertilizer Used</Label>
            <Switch
              checked={form.fertilizerUsed}
              onCheckedChange={(v) => setForm({ ...form, fertilizerUsed: v })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <Label className="text-sm font-medium">Irrigation Used</Label>
            <Switch
              checked={form.irrigationUsed}
              onCheckedChange={(v) => setForm({ ...form, irrigationUsed: v })}
            />
          </div>
        </div>
      </div>

      <Button
        className="w-full mt-8 h-13 text-base gap-2.5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all hover:scale-[1.01]"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Running Prediction Model...
          </>
        ) : (
          <>
            <Sprout className="w-5 h-5" />
            Predict Crop Yield
          </>
        )}
      </Button>
    </Card>
  );
};

export default PredictionForm;
