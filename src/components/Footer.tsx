import { Leaf, ExternalLink } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border/50 bg-card/50">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-card-foreground font-sans">
            CropYield<span className="text-primary">AI</span>
          </span>
        </div>
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            Intelligent Crop Yield Prediction & Agentic Farm Advisory
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Project 8 · 2026
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://colab.research.google.com/drive/1NCVCd8zrLf48e189tVq6rckKxzUhlbGQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            Colab <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.kaggle.com/datasets/samuelotiattakorah/agriculture-crop-yield"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            Dataset <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
