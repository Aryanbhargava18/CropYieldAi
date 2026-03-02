import heroFarm from "@/assets/hero-farm.jpg";
import { Leaf, BarChart3, Brain, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroFarm}
          alt="Aerial view of agricultural farmland"
          className="w-full h-full object-cover scale-105"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        {/* Animated grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 pt-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/25 backdrop-blur-md mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground/90 tracking-wide">
              ML-Based Crop Yield Prediction
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up leading-[0.9] tracking-tight">
            <span className="text-primary-foreground">Intelligent Crop</span>
            <br />
            <span className="text-gradient-hero">Yield Prediction</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl animate-fade-in-up font-sans leading-relaxed animate-stagger-2">
            Predicting agricultural productivity using classical machine learning
            on historical crop, soil, and weather data. Powered by our Linear Regression
            model.
          </p>

          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up animate-stagger-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2.5 text-base px-8 h-13 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
              onClick={() =>
                document
                  .getElementById("prediction")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <BarChart3 className="w-5 h-5" />
              Try Prediction
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 gap-2.5 text-base px-8 h-13 backdrop-blur-md transition-all hover:border-primary-foreground/50"
              onClick={() =>
                document
                  .getElementById("model-performance")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Brain className="w-5 h-5" />
              View Model Metrics
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 max-w-md animate-fade-in-up animate-stagger-4">
            {[
              { label: "Samples", value: "1M+" },
              { label: "Features", value: "9" },
              { label: "Crops", value: "6" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground font-sans tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/50 mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-primary-foreground/40 tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 text-primary-foreground/40" />
      </div>
    </section>
  );
};

export default HeroSection;
