import { ArrowRight, Shirt, Users, Recycle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shirt className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-gray-600 hover:text-green-600 transition-colors">
              Browse Items
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
              How It Works
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-green-600 transition-colors">
              Sign In
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Swap, Share, and 
            <span className="text-green-600"> Sustain</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the community clothing exchange. Give your clothes a second life and discover 
            amazing pieces from others. Reduce waste, save money, and build connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/auth/register"
              className="rewear-button-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Start Swapping
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/browse"
              className="rewear-button-secondary text-lg px-8 py-4"
            >
              Browse Items
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">10K+</div>
              <div className="text-gray-600">Items Swapped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">5K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and sustainable. Three easy steps to start your clothing exchange journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shirt className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and descriptions of clothes you no longer wear. 
                Set point values or mark them for direct swaps.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Connect & Swap</h3>
              <p className="text-gray-600">
                Browse items from other users. Send swap requests or redeem items 
                using points you've earned from successful swaps.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Recycle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sustain & Save</h3>
              <p className="text-gray-600">
                Complete your swaps and earn points. Reduce textile waste while 
                refreshing your wardrobe sustainably and affordably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making a positive impact on the environment 
            while discovering amazing clothing pieces.
          </p>
          <Link 
            href="/auth/register"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Join ReWear Today
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shirt className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold text-white">ReWear</span>
              </div>
              <p className="text-gray-400">
                Building a sustainable future through community-driven clothing exchange.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/browse" className="hover:text-green-500 transition-colors">Browse Items</Link></li>
                <li><Link href="/how-it-works" className="hover:text-green-500 transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-green-500 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:text-green-500 transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-green-500 transition-colors">Contact Us</Link></li>
                <li><Link href="/safety" className="hover:text-green-500 transition-colors">Safety Guidelines</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-green-500 transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-green-500 transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 ReWear. All rights reserved. Built for the Odoo Hackathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
