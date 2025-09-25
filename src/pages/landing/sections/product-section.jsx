import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, ArrowRight } from "lucide-react";

export default function ProductSection() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Arduino Uno R3",
      image:
        "https://t3.ftcdn.net/jpg/01/90/38/70/360_F_190387040_jMLzGBfhj0eLbQl01Vp9tLrOnxzszNWZ.jpg",
      description:
        "Mikrokontroler untuk mengontrol rangkaian elektronik dan menjalankan program.",
    },
    {
      id: 2,
      name: "Arduino Nano",
      image:
        "https://t3.ftcdn.net/jpg/01/90/38/70/360_F_190387040_jMLzGBfhj0eLbQl01Vp9tLrOnxzszNWZ.jpg",
      description:
        "Mikrokontroler ukuran kecil untuk mengontrol perangkat elektronik di ruang terbatas.",
    },
    {
      id: 3,
      name: "Sensor Ultrasonik HC-SR04",
      image:
        "https://t3.ftcdn.net/jpg/01/90/38/70/360_F_190387040_jMLzGBfhj0eLbQl01Vp9tLrOnxzszNWZ.jpg",
      description:
        "Mengukur jarak dengan memancarkan dan menerima gelombang ultrasonik.",
    },
  ];

  return (
    <section id="produk" className="px-8 mb-24">
      <h2 className="text-2xl lg:text-3xl xl:text-4xl font-medium mb-5 leading-tight text-center">
        Produk
      </h2>
      <p className="text-center">Berbagai produk unggulan kami.</p>

      <div className="produk-box mt-10 grid md:grid-cols-3 grid-cols-1 gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>

      {/* Lihat Semua Produk */}
      <div className="flex justify-center mt-8">
        <Button
          size="lg"
          onClick={() => navigate("/products")}
          className="text-white px-8 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          Lihat Semua Produk
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function ProductCard({ name, image, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />

          {/* Product Status Badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-emerald-500/90 text-white border-0 backdrop-blur-sm"
          >
            Tersedia
          </Badge>

          {/* Hover Action Buttons */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-slate-900 shadow-lg backdrop-blur-sm"
            >
              <Eye className="h-4 w-4 mr-1" />
              Lihat
            </Button>
            <Button
              size="sm"
              className="bg-primary/90 hover:bg-primary text-white shadow-lg"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Beli
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center text-xs text-slate-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              Stok Tersedia
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-indigo-50 p-2 flex items-center gap-1"
            >
              Detail
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
