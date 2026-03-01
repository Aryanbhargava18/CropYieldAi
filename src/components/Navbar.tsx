import { Leaf, Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const links = [
    { label: "Predict", id: "prediction" },
    { label: "Metrics", id: "model-performance" },
    { label: "Features", id: "features" },
    { label: "Dataset", id: "dataset" },
    { label: "Architecture", id: "architecture" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <Leaf className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground font-sans text-lg tracking-tight">
            CropYield<span className="text-primary">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hidden sm:inline-flex"
            onClick={() => window.open("https://colab.research.google.com/drive/1NCVCd8zrLf48e189tVq6rckKxzUhlbGQ", "_blank")}
          >
            <Github className="w-4 h-4" />
            Colab Notebook
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-3 rounded-lg hover:bg-muted/50 text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
