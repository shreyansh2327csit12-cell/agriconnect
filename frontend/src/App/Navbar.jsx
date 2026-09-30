import { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useEffect } from "react";
import { set } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wheat } from "lucide-react";
import useTokenStore from "../http/store";


export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    try {
        const token = localStorage.getItem("user-store");
        if (token) {
            const userData = JSON.parse(token);
            setIsAdmin(userData?.state?.role === "admin");
        } else {
            setIsAdmin(false);
        }
    } catch (error) {
        console.error("Error accessing user data:", error);
        setIsAdmin(false);
    } 
}, []);
  // State to manage the mobile navigation menu
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("user-store");
    const userId= useTokenStore.getState().userId;
    setUserId(userId);
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  function handleLogout() {
    localStorage.removeItem("user-store");
    setLogin(false);
    window.location.href = "/";
  }
  const [isOpen, setIsOpen] = useState(false);
  const NavLink = ({ to, children }) => (
    <Link to={to} className="block cursor-pointer">
      <Button
        variant="ghost"
        className="text-lg font-medium hover:bg-accent/50 hover:underline text-blue-600 dark:text-blue-400 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        {children}
      </Button>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Website Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-800">
              <span className="text-orange-600">Agri</span>Connect</span>  <Wheat className="h-4 w-4" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/marketplace">Marketplace</NavLink>
              <NavLink to="/products">Farm Products</NavLink>
              <NavLink to="/community-forum">Community</NavLink>
              {/* <NavLink to="/services">Services</NavLink> */}
              <NavLink to="/aboutus">About Us</NavLink>
              <NavLink to="/contactus">Contact</NavLink>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <ModeToggle />
              {isLogin ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {isAdmin && (
                        <DropdownMenuItem onClick={() => navigate("/admin")}>
                          Admin Panel
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => navigate(`/profile`)}>Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>) :
                (
                  <Link to="/login">
                    <Button variant="default" size="sm">
                      Login
                    </Button>
                  </Link>)}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                  </svg>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full py-6">
                  <div className="flex flex-col gap-4">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/auctionlist">Marketplace</NavLink>
                    <NavLink to="/products">Farm Products</NavLink>
                    {/* <NavLink to="/services">Services</NavLink> */}
                    <NavLink to="/aboutus">About Us</NavLink>
                    <NavLink to="/contactus">Contact</NavLink>
                  </div>
                  <div className="mt-auto pt-6">
                    <ModeToggle />
                    {isLogin ? (
                      <>
                         <Link to="/profile">
                          <Button className="w-full">Login</Button>
                        </Link>
                        <Button className="w-full" variant="destructive" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>) :
                      (
                        <Link to="/login">
                          <Button className="w-full" variant="outline">Login</Button>
                        </Link>
                      )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
