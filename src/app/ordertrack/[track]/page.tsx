import { ArrowRight, Mail, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const track = "BS348290138";
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-18">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sifarişiniz üçün təşəkkürlər!</h1>
          <p className="text-gray-600">Hazırda sifarişiniz üzərində çalışırıq</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6 flex-1">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Image
                  src="/marketimg/sport.png"
                  alt="Tommy Hilfiger Men's Kelby Sneaker"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">
                  Sifariş nömrəsi : <span className="font-semibold text-gray-900">#9581347322</span>
                </p>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Tommy Hilfiger Men's Kelby Sneaker</h2>
                <p className="text-2xl font-bold text-gray-900">1250 AZN</p>
              </div>
            </div>

            <Link href={`/ordertrack/${track}/detail`} className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-4  rounded-lg flex items-center gap-2 whitespace-nowrap">
              Sifariş statusuna baxın
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-600">
            Sifariş nömrəsi : <span className="font-semibold text-gray-900">BS348290138</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Hər hansı bir sualınız varsa bizimlə əlaqə saxlayın
          </h3>

          <div className="flex flex-wrap gap-8 mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">stridex@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">+994 700 70 77</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Nizami rayonu ,M.Abbasov küçəsi</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-lg bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors">
              <Facebook className="w-5 h-5 text-pink-500" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors">
              <Instagram className="w-5 h-5 text-pink-500" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors">
              <Send className="w-5 h-5 text-pink-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
