import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Twitter,
} from 'lucide-react'

import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-300">
      <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid gap-12 xl:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <PawPrint size={18} />
              </div>
              <span className="font-display text-xl font-bold text-white">
                PawsomeShop
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              The ultimate destination for premium pet supplies. We care for
              your pets as much as you do.
            </p>
            <div className="flex gap-4">
              {[
                { key: 'facebook', icon: <Facebook size={16} /> },
                { key: 'instagram', icon: <Instagram size={16} /> },
                { key: 'twitter', icon: <Twitter size={16} /> },
              ].map((item) => (
                <a
                  key={item.key}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-emerald-500"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/shop"
                  className="transition-colors hover:text-emerald-500"
                >
                  Shop Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-emerald-500"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="transition-colors hover:text-emerald-500"
                >
                  Pet Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="transition-colors hover:text-emerald-500"
                >
                  Flash Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Customer Care</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/help"
                  className="transition-colors hover:text-emerald-500"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="transition-colors hover:text-emerald-500"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="transition-colors hover:text-emerald-500"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <a
                  href="#tracking"
                  className="transition-colors hover:text-emerald-500"
                >
                  Order Tracking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-emerald-500" />
                <span>123 Pet Lane, Paw City, PC 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-emerald-500" />
                <span>+1 (800) PAW-SOME</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-500" />
                <span>hello@pawsomeshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-10 text-xs md:flex-row">
          <p>© 2024 PawsomeShop. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/rules/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/rules/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link to="/rules/cookies" className="hover:text-white">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
