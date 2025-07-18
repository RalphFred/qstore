import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="wrapper py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="w-12 h-12"
              />
              <span className="text-2xl font-bold">QSTORE</span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              A modern e-commerce demo showcasing seamless cryptocurrency payments for the future of digital shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/shop" className="block text-white/80 hover:text-white transition-colors text-sm">
                Shop All
              </Link>
              <Link href="/cart" className="block text-white/80 hover:text-white transition-colors text-sm">
                Cart
              </Link>
              <Link href="/about" className="block text-white/80 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/contact" className="block text-white/80 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © 2024 QStore. All rights reserved.
            </p>
            
            {/* Developer Credit */}
            <p className="text-white/60 text-sm">
              Built by{" "}
              <Link 
                href="https://raphaels.studio/" 
                className="text-white hover:text-white/80 transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                KWAGHUTER
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
