import { Leaf, Users, Recycle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">How ReWear Works</h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          ReWear makes sustainable fashion accessible and fun. Follow these simple steps to start swapping and redeeming
          clothes!
        </p>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">1. List Your Items</h2>
              <p className="text-gray-700">
                Have clothes you no longer wear but are still in great condition? Take clear photos, write a detailed
                description, and specify the category, size, and condition. Our system will suggest a point value for
                your item.
              </p>
              <Link href="/add-item">
                <Button variant="link" className="text-green-600 px-0 mt-2">
                  List an Item Now <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">2. Browse & Connect</h2>
              <p className="text-gray-700">
                Explore our diverse catalog of pre-loved garments. Use filters to find exactly what you're looking for.
                When you find an item you love, you can either propose a direct swap with one of your listed items or
                redeem it using your accumulated points.
              </p>
              <Link href="/browse">
                <Button variant="link" className="text-green-600 px-0 mt-2">
                  Browse Items <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Recycle className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">3. Swap or Redeem</h2>
              <p className="text-gray-700">
                Once a swap is agreed upon or you choose to redeem with points, we facilitate the exchange. Items are
                shipped directly between users, ensuring a smooth and secure transaction. Earn points when your items
                are successfully swapped or redeemed!
              </p>
              <Link href="/dashboard">
                <Button variant="link" className="text-green-600 px-0 mt-2">
                  Manage Your Swaps <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">4. Enjoy & Repeat!</h2>
              <p className="text-gray-700">
                Receive your new-to-you clothes and give your wardrobe a sustainable refresh. The more you participate,
                the more points you earn, and the more you contribute to reducing textile waste. It's a win-win for you
                and the planet!
              </p>
              <Link href="/browse">
                <Button variant="link" className="text-green-600 px-0 mt-2">
                  Find Your Next Item <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join the Movement?</h2>
          <p className="text-lg text-gray-700 mb-6">Start your sustainable fashion journey with ReWear today.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
