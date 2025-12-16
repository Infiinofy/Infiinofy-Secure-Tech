import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname === "/") {
      // Already on home page, scroll to contact section
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home first, then scroll
      window.location.href = "/?section=contact";
    }
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname === "/") {
      // Already on home page, scroll to services section
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home first, then scroll
      window.location.href = "/?section=services";
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/#services" },
    { name: "Projects", path: "/projects" },
    { name: "Schedule Meeting", path: "/schedule" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-luxury shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 blur-lg bg-primary/30 animate-glow-pulse" />
            </div>
            <span className="text-2xl font-bold text-gradient-gold">ShreeJin Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.name === "Contact") {
                return (
                  <button
                    key={link.path}
                    onClick={handleContactClick}
                    className="text-sm font-medium transition-colors hover:text-primary text-foreground/80"
                  >
                    {link.name}
                  </button>
                );
              }
              if (link.name === "Services") {
                return (
                  <button
                    key={link.path}
                    onClick={handleServicesClick}
                    className="text-sm  font-medium transition-colors hover:text-primary text-foreground/80"
                  >
                    {link.name}
                  </button>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link to="/schedule">
              <Button className="hover-glow">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <div className="fixed left-0 right-0 top-[72px] md:hidden z-50 animate-fade-in">
              <div className="mx-6 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl">
                <div className="flex flex-col space-y-1 p-6">
                  {navLinks.map((link) => {
                    if (link.name === "Contact") {
                      return (
                        <button
                          key={link.path}
                          onClick={handleContactClick}
                          className="text-sm font-medium text-left transition-colors hover:text-primary hover:bg-primary/10 py-3 px-4 rounded-lg text-foreground/80"
                        >
                          {link.name}
                        </button>
                      );
                    }
                    if (link.name === "Services") {
                      return (
                        <button
                          key={link.path}
                          onClick={handleServicesClick}
                          className="text-sm font-medium text-left transition-colors hover:text-primary hover:bg-primary/10 py-3 px-4 rounded-lg text-foreground/80"
                        >
                          {link.name}
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 py-3 px-4 rounded-lg",
                          location.pathname === link.path
                            ? "text-primary bg-primary/10"
                            : "text-foreground/80"
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  <div className="pt-4">
                    <Link to="/schedule" onClick={() => setIsOpen(false)}>
                      <Button className="w-full hover-glow">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
