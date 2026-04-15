import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '@/api/products';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import SkeletonCard from '@/components/SkeletonCard';
import Navbar from '@/components/Navbar';
import SecondaryNav from '@/components/SecondaryNav';
import Footer from '@/components/Footer';
import { ChevronLeft, ChevronRight, ArrowUp, PackageX } from 'lucide-react';

const banners = [
  'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop',
];

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Banner auto-slide
  useEffect(() => {
    const timer = setInterval(() => setBannerIndex((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Back to top button
  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchProducts({
        category: category || undefined,
        search: debouncedSearch || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice < 100000 ? maxPrice : undefined,
      });
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch, minPrice, maxPrice]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const categories = ['Electronics', 'Computers', 'Smart Home', 'Clothing', 'Books'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SecondaryNav selectedCategory={category} onCategorySelect={setCategory} />

      {/* Banner Carousel */}
      <div className="relative w-full h-48 md:h-72 lg:h-80 overflow-hidden bg-foreground/5">
        {banners.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Banner ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === bannerIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <button onClick={() => setBannerIndex((i) => (i - 1 + banners.length) % banners.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 p-2 rounded-full hover:bg-card transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => setBannerIndex((i) => (i + 1) % banners.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 p-2 rounded-full hover:bg-card transition-colors">
          <ChevronRight size={24} />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBannerIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === bannerIndex ? 'bg-amazon-orange' : 'bg-card/60'}`} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex gap-6 flex-1">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-56 flex-shrink-0 space-y-6">
          <div>
            <h3 className="font-bold text-sm mb-2 text-foreground">Category</h3>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm py-1 cursor-pointer text-foreground">
                <input
                  type="checkbox"
                  checked={category === cat}
                  onChange={() => setCategory(category === cat ? '' : cat)}
                  className="accent-amazon-orange"
                />
                {cat}
              </label>
            ))}
          </div>
          <div>
            <h3 className="font-bold text-sm mb-2 text-foreground">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full border border-border rounded px-2 py-1 text-sm bg-card text-foreground"
                  placeholder="Min"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full border border-border rounded px-2 py-1 text-sm bg-card text-foreground"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-2 text-foreground">Avg. Rating</h3>
            {[4, 3, 2, 1].map((r) => (
              <button key={r} className="flex items-center gap-1 text-sm py-1 hover:text-amazon-orange w-full text-foreground">
                {'★'.repeat(r)}{'☆'.repeat(5 - r)} <span className="text-xs text-muted-foreground">& Up</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {error ? (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">Failed to load products</p>
              <button onClick={loadProducts} className="btn-amazon">Retry</button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <PackageX size={64} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-secondary-nav text-secondary-nav-foreground p-3 rounded-full shadow-lg hover:bg-secondary-nav/80 transition-all z-40"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default HomePage;
