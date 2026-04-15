import type { Product } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Mock data for demo (used when API is unavailable)
const mockProducts: Product[] = [
  {
    id: '1', name: 'Samsung Galaxy M14 5G', description: 'Triple camera setup with 50MP main camera. 6000mAh battery with 25W fast charging.', price: 10999, originalPrice: 14999,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'],
    category: 'Electronics', stock: 45, rating: 4.2, reviewCount: 12453, isPrime: true,
    specifications: [{ key: 'RAM', value: '6 GB' }, { key: 'Storage', value: '128 GB' }, { key: 'Display', value: '6.6 inch' }]
  },
  {
    id: '2', name: 'boAt Rockerz 450 Bluetooth Headphone', description: 'Immersive audio with 40mm drivers. Up to 15 hours playback.', price: 1299, originalPrice: 3990,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400'],
    category: 'Electronics', stock: 120, rating: 4.0, reviewCount: 87654, isPrime: true,
    specifications: [{ key: 'Driver Size', value: '40mm' }, { key: 'Battery', value: '15 Hours' }, { key: 'Type', value: 'Over-Ear' }]
  },
  {
    id: '3', name: 'HP Laptop 15s, 12th Gen Intel Core i5', description: 'Intel Core i5-1235U processor, 8GB RAM, 512GB SSD. Full HD display.', price: 48990, originalPrice: 62738,
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'],
    category: 'Computers', stock: 18, rating: 4.3, reviewCount: 3421, isPrime: true,
    specifications: [{ key: 'Processor', value: 'i5-1235U' }, { key: 'RAM', value: '8 GB' }, { key: 'SSD', value: '512 GB' }]
  },
  {
    id: '4', name: 'Echo Dot (5th Gen) Smart Speaker', description: 'Improved audio with clearer vocals and deeper bass. Alexa built-in.', price: 4499, originalPrice: 5499,
    images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=400', 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400', 'https://images.unsplash.com/photo-1512446816042-444d641267d4?w=400', 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400'],
    category: 'Smart Home', stock: 200, rating: 4.5, reviewCount: 45230, isPrime: true,
    specifications: [{ key: 'Speaker', value: '1.73" front-firing' }, { key: 'Connectivity', value: 'Wi-Fi, Bluetooth' }]
  },
  {
    id: '5', name: 'Levi\'s Men\'s Cotton T-Shirt', description: '100% cotton, regular fit crew neck t-shirt.', price: 599, originalPrice: 1499,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400'],
    category: 'Clothing', stock: 500, rating: 4.1, reviewCount: 9876,
    specifications: [{ key: 'Material', value: '100% Cotton' }, { key: 'Fit', value: 'Regular' }, { key: 'Neck', value: 'Crew' }]
  },
  {
    id: '6', name: 'Atomic Habits by James Clear', description: 'Tiny changes, remarkable results. #1 New York Times bestseller.', price: 399, originalPrice: 799,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400'],
    category: 'Books', stock: 1000, rating: 4.7, reviewCount: 156789, isPrime: true,
    specifications: [{ key: 'Pages', value: '320' }, { key: 'Language', value: 'English' }, { key: 'Publisher', value: 'Penguin' }]
  },
  {
    id: '7', name: 'Fire-Boltt Phoenix Smart Watch', description: 'AI voice assistant, Bluetooth calling, 1.3" HD display.', price: 1499, originalPrice: 8999,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400'],
    category: 'Electronics', stock: 75, rating: 3.9, reviewCount: 23456, isPrime: true,
    specifications: [{ key: 'Display', value: '1.3" HD' }, { key: 'Battery', value: '7 Days' }, { key: 'Water Resistant', value: 'IP67' }]
  },
  {
    id: '8', name: 'Prestige Electric Kettle 1.5L', description: 'Stainless steel body, auto cut-off, 1500W power.', price: 749, originalPrice: 1195,
    images: ['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400', 'https://images.unsplash.com/photo-1517256064527-9d164d0a51e1?w=400'],
    category: 'Smart Home', stock: 60, rating: 4.0, reviewCount: 5678,
    specifications: [{ key: 'Capacity', value: '1.5 Litres' }, { key: 'Power', value: '1500W' }, { key: 'Material', value: 'Stainless Steel' }]
  },
];

export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    if (params?.minPrice) query.set('minPrice', String(params.minPrice));
    if (params?.maxPrice) query.set('maxPrice', String(params.maxPrice));
    const res = await fetch(`${API_BASE}/products?${query}`);
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    // Fallback to mock data with filtering
    let filtered = [...mockProducts];
    if (params?.category) filtered = filtered.filter(p => p.category === params.category);
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(s));
    }
    if (params?.minPrice) filtered = filtered.filter(p => p.price >= params.minPrice!);
    if (params?.maxPrice) filtered = filtered.filter(p => p.price <= params.maxPrice!);
    return filtered;
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    return mockProducts.find(p => p.id === id) || null;
  }
}
