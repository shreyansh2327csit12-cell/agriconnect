import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-full">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h1 className="font-bold text-green-800 text-lg">FarmAuction</h1>
            <p className="text-xs text-gray-500">Connect farmers & buyers</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            Browse Auctions
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            How It Works
          </a>
          <a href="#" className="text-green-600 font-medium">
            Create Listing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
          >
            Sign In
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
