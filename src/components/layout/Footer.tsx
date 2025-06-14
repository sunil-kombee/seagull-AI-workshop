import Logo from "@/components/common/Logo";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo className="text-xl" />
            <p className="mt-4 text-sm">
              Your one-stop solution for travel services worldwide. Book airport
              transfers, activities, tours, and more with ease.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold  text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold  text-foreground">
              Connect With Us
            </h3>
            <div className="flex mt-4 space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Global Travel Hub. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
