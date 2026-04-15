import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '@/api/products';
import type { Product } from '@/types';
import StarRating from '@/components/StarRating';
import QuantityStepper from '@/components/QuantityStepper';
import Navbar from '@/components/Navbar';
import SecondaryNav from '@/components/SecondaryNav';
import Footer from '@/components/Footer';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { ShieldCheck, Truck } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity,
    });
    toast.success('Added to cart ✓');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <SecondaryNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <SecondaryNav />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-xl font-bold text-foreground">Product not found</p>
          <Link to="/" className="btn-amazon">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SecondaryNav />

      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex-1">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-card rounded-lg overflow-hidden border border-border mb-3 group cursor-zoom-in relative">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-150 transition-transform duration-300 origin-center"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden transition-colors ${
                    i === mainImage ? 'border-amazon-orange' : 'border-border hover:border-amazon-hover'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />

            <div className="border-t border-border mt-4 pt-4">
              <div className="flex items-baseline gap-2">
                {discount > 0 && <span className="text-destructive text-xl font-medium">-{discount}%</span>}
                <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              </div>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground mt-1">
                  M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span>
                </p>
              )}
              {product.isPrime && (
                <div className="flex items-center gap-1 text-sm text-blue-600 mt-2">
                  <ShieldCheck size={16} /> Prime
                </div>
              )}
            </div>

            <div className="mt-4">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Truck size={16} />
              <span>FREE delivery by <strong className="text-foreground">{deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</strong></span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground">Qty:</span>
                <QuantityStepper quantity={quantity} onChange={setQuantity} />
              </div>
              <button onClick={handleAddToCart} disabled={product.stock === 0} className="btn-amazon w-full py-3 text-base disabled:opacity-50">
                Add to Cart
              </button>
              <Link to="/checkout" onClick={handleAddToCart} className="btn-amazon-yellow w-full py-3 text-base block text-center">
                Buy Now
              </Link>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-border pt-6">
              <h2 className="font-bold text-lg text-foreground mb-3">About this item</h2>
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
              {product.specifications.length > 0 && (
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications.map((spec) => (
                      <tr key={spec.key} className="border-b border-border">
                        <td className="py-2 font-medium text-foreground w-1/3">{spec.key}</td>
                        <td className="py-2 text-muted-foreground">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
