import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PredictionForm from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import ModelPerformance from "@/components/ModelPerformance";
import FeatureImportance from "@/components/FeatureImportance";
import DatasetOverview from "@/components/DatasetOverview";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Footer from "@/components/Footer";

const Index = () => {
  const [prediction, setPrediction] = useState<{
    yield: number;
    category: string;
    r2: number;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Prediction Section */}
      <section id="prediction" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-badge bg-primary/10 border border-primary/20 mb-5 mx-auto w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm">Live Prediction</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Crop Yield Prediction
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Enter your farm parameters to get an ML-powered yield prediction
              using our linear regression model. The result includes the R² score.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-3">
              <PredictionForm onPredict={setPrediction} />
            </div>
            <div className="lg:col-span-2">
              <PredictionResult result={prediction} />
            </div>
          </div>
        </div>
      </section>

      <ModelPerformance />

      <div id="features">
        <FeatureImportance />
      </div>

      <div id="dataset">
        <DatasetOverview />
      </div>

      <div id="architecture">
        <ArchitectureDiagram />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
