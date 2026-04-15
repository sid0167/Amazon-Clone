import { Link } from 'react-router-dom';

const categories = ['All', 'Electronics', 'Computers', 'Smart Home', 'Clothing', 'Books'];

interface SecondaryNavProps {
  selectedCategory?: string;
  onCategorySelect?: (cat: string) => void;
}

const SecondaryNav = ({ selectedCategory, onCategorySelect }: SecondaryNavProps) => {
  return (
    <div className="bg-secondary-nav text-secondary-nav-foreground">
      <div className="flex items-center gap-1 px-4 py-1 overflow-x-auto text-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect?.(cat === 'All' ? '' : cat)}
            className={`px-3 py-1 rounded whitespace-nowrap hover:outline hover:outline-1 hover:outline-secondary-nav-foreground transition-colors ${
              (cat === 'All' && !selectedCategory) || selectedCategory === cat
                ? 'font-bold underline underline-offset-4'
                : ''
            }`}
          >
            {cat}
          </button>
        ))}
        <Link to="/orders" className="px-3 py-1 rounded whitespace-nowrap hover:outline hover:outline-1 hover:outline-secondary-nav-foreground ml-auto">
          Order History
        </Link>
      </div>
    </div>
  );
};

export default SecondaryNav;
