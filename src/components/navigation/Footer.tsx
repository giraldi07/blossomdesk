import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-2 md:mb-0">
          <span>© {currentYear} BlossomDesk. All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
          <span className="flex items-center">
            Made with <Heart size={14} className="mx-1 text-destructive" fill="currentColor" /> for BlossomBiz
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;