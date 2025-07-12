import { Leaf, Recycle, Users, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">About ReWear</h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          At ReWear, we believe in a future where fashion is sustainable, accessible, and circular. Our mission is to
          transform the way people consume clothing by promoting reuse and reducing textile waste.
        </p>

        <div className="space-y-12">
          {/* Our Mission */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Mission</h2>
              <p className="text-gray-700">
                To empower individuals to make conscious fashion choices by providing a seamless and rewarding platform
                for exchanging pre-loved garments. We aim to extend the lifecycle of clothing, reduce environmental
                impact, and foster a vibrant community of sustainable fashion enthusiasts.
              </p>
            </div>
          </div>

          {/* The Problem We're Solving */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">The Problem We're Solving</h2>
              <p className="text-gray-700">
                The fashion industry is one of the largest polluters globally, with massive amounts of textile waste
                ending up in landfills. Fast fashion encourages overconsumption and disposability. ReWear offers a
                tangible solution by creating a circular economy for clothing, giving garments a second life and
                reducing the demand for new production.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Recycle className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Values</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <strong>Sustainability:</strong> Prioritizing environmental well-being in every aspect.
                </li>
                <li>
                  <strong>Community:</strong> Building a supportive network of like-minded individuals.
                </li>
                <li>
                  <strong>Accessibility:</strong> Making sustainable fashion easy and affordable for everyone.
                </li>
                <li>
                  <strong>Transparency:</strong> Ensuring clear and honest practices.
                </li>
              </ul>
            </div>
          </div>

          {/* Join Our Community */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Join Our Community</h2>
              <p className="text-gray-700">
                Be part of the movement that's changing fashion for good. Whether you're looking to declutter your
                wardrobe, find unique pieces, or simply contribute to a greener planet, ReWear is the place for you.
              </p>
              <Link href="/signup">
                <Button variant="link" className="text-green-600 px-0 mt-2">
                  Become a Member <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-lg text-gray-700 mb-6">
            We're here to help! Reach out to our support team for any inquiries.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
