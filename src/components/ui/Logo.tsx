import { Flower } from 'lucide-react';
import { Link } from 'react-router-dom';

type LogoProps = {
  compact?: boolean;
};

const Logo = ({ compact = false }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md text-white">
        <Flower size={18} />
      </div>
      
      {!compact && (
        <div className="flex flex-col">
          <span className="font-bold text-lg text-primary">BlossomDesk</span>
          {/* Optionally add a tagline here if needed */}
        </div>
      )}
    </Link>
  );
};

export default Logo;