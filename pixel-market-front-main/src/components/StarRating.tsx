import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  onRate?: (value: number) => void; // 🔥 ADD THIS
}

const StarRating = ({ rating, reviewCount, size = 16, onRate }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            onClick={(e) => {
              e.preventDefault(); // 🔥 VERY IMPORTANT (stops Link navigation)
              if (onRate) onRate(star);
            }}
            className={`cursor-pointer ${
              star <= Math.floor(rating)
                ? 'fill-amazon-orange text-amazon-orange'
                : star - 0.5 <= rating
                ? 'fill-amazon-orange/50 text-amazon-orange'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>

      {reviewCount !== undefined && (
        <span className="text-sm text-blue-600 hover:underline cursor-pointer">
          {reviewCount.toLocaleString()}
        </span>
      )}
    </div>
  );
};

export default StarRating;