import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Eye,
  Search,
  Filter,
  Grid3X3,
  List,
  Package,
  Star,
} from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";

export default function ProductPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [isHoveredCard, setIsHoveredCard] = useState(null);

  // Use real API hooks with dynamic parameters
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useProducts(0, 50, sortBy, selectedCategory);
  const { data: categoriesData, loading: categoriesLoading } = useCategories(
    0,
    20
  );

  // Build categories array from API data
  const categories = [
    { value: "all", label: "Semua Kategori" },
    ...(categoriesData || []).map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  const sortOptions = [
    { value: "name-asc", label: "Nama A-Z" },
    { value: "name-desc", label: "Nama Z-A" },
    { value: "price-asc", label: "Harga Terendah" },
    { value: "price-desc", label: "Harga Tertinggi" },
  ];

  // Client-side search filtering (since search is handled on frontend)
  const filteredProducts = (products || []).filter((product) => {
    if (!searchQuery) return true;
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Semua Produk
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Temukan berbagai produk elektronik dan robotika pilihan terbaik untuk
          proyek Anda.
        </p>
      </div>

      {/* Loading State */}
      {productsLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {productsError && !productsLoading && (
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Gagal Memuat Produk
            </h3>
            <p className="text-muted-foreground mb-4">
              Terjadi kesalahan saat memuat data produk. Silakan coba lagi.
            </p>
            <Button onClick={() => window.location.reload()}>Muat Ulang</Button>
          </CardContent>
        </Card>
      )}

      {/* Show content only when not loading and no error */}
      {!productsLoading && !productsError && (
        <>
          {/* Filters and Controls */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari produk..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 border rounded-md p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Results Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Menampilkan {filteredProducts.length} dari{" "}
                  {products?.length || 0} produk
                </span>
                {searchQuery && (
                  <span>Hasil pencarian untuk "{searchQuery}"</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Products Grid/List */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  formatPrice={formatPrice}
                  isHovered={isHoveredCard === product.id}
                  onHover={(hovered) =>
                    setIsHoveredCard(hovered ? product.id : null)
                  }
                  navigate={navigate}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    Tidak ada produk ditemukan
                  </p>
                  <p className="text-sm">
                    Coba ubah kata kunci pencarian atau filter yang dipilih.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ProductCard({
  product,
  viewMode,
  formatPrice,
  isHovered,
  onHover,
  navigate,
}) {
  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  if (viewMode === "list") {
    return (
      <Card
        className="group overflow-hidden hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-48 h-48 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
              <img
                src={product.image_url || "/src/assets/arduino-parts.jpg"}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "/src/assets/arduino-parts.jpg";
                }}
              />
              <Badge
                variant="secondary"
                className="absolute top-3 left-3 bg-emerald-500/90 text-white border-0"
              >
                Tersedia
              </Badge>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ⭐ {product.rating}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="sm" variant="outline" onClick={handleViewDetails}>
                  <Eye className="h-4 w-4 mr-2" />
                  Detail
                </Button>
                <Button size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={product.image_url || "/src/assets/arduino-parts.jpg"}
            alt={product.name}
            className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/src/assets/arduino-parts.jpg";
            }}
          />

          {/* Stock Badge */}
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
              onClick={handleViewDetails}
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
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>

            <div className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center text-xs text-slate-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              Tersedia
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10 p-2"
              onClick={handleViewDetails}
            >
              Detail →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
