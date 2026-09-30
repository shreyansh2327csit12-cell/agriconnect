import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  Leaf, 
  Package, 
  BarChart, 
  ChevronLeft, 
  ChevronRight,
  CircleDollarSign,
  Sprout,
  Sun,
  Tractor,
  Users,
  Globe,
  Award,
  CalendarDays,
  Wheat,
  HandCoins
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Carousel image data
const carouselImages = [
  {
    id: 1,
    url: "https://timesofagriculture.in/wp-content/uploads/2023/08/feature-image-2-1-1-1-scaled.jpg", 
    alt: "Government schemes for farmers",
    caption: "Government schemes for farmers"
  },
  {
    id: 2,
    url: "https://i.ytimg.com/vi/UhZAgYPXmCk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDV4NskwColtGNsSO6ucB0r-Fa5Nw",
    alt: "Top 10 Government Schemes for Farmers",
    caption: "Top 10 Government Schemes for Farmers"
  },
  {
    id: 3,
    url: "http://drishtiias.com/images/uploads/1725522452_image10.png",
    alt: "Digital Agriculture Mission",
    caption: "Digital Agriculture Mission"
  },
];

export default function Home() {
    const imageRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);

    // Carousel navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    };
    
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
    };
    
    // Auto-scroll carousel
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        const token = localStorage.getItem("user-store");
        if (token) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!imageRef.current) return;
            
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const floatY = Math.sin(Date.now() / 1000) * 5;
            const floatX = Math.sin(Date.now() / 1500) * 3;
            
            const hoverIntensity = isHovered ? 1.5 : 1;
            
            imageRef.current.style.transform = `
                perspective(1000px) 
                rotateY(${x * hoverIntensity}deg) 
                rotateX(${-y * hoverIntensity}deg) 
                translateY(${floatY}px) 
                translateX(${floatX}px)
                scale(${isHovered ? 1.05 : 1})
            `;
            imageRef.current.style.transition = "transform 0.1s ease-out";
        };
        
        const animationInterval = setInterval(() => {
            if (!imageRef.current) return;
            
            const floatY = Math.sin(Date.now() / 1000) * 5;
            const floatX = Math.sin(Date.now() / 1500) * 3;
            
            if (!isHovered) {
                imageRef.current.style.transform = `
                    perspective(1000px) 
                    rotateY(${Math.sin(Date.now() / 2000) * 5}deg) 
                    rotateX(${Math.sin(Date.now() / 2500) * 5}deg) 
                    translateY(${floatY}px) 
                    translateX(${floatX}px)
                `;
            }
        }, 50);
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(animationInterval);
        };
    }, [isHovered]);
    
    return(
        <>
         <div className="bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-20 overflow-x-hidden">
      {/* Header Section */}
      <header className="container mx-auto py-10 text-center">
        <span className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm flex items-center justify-center gap-2 w-fit mx-auto">
          <Wheat className="h-4 w-4" /> #1 Marketplace for Modern Farming
        </span>
        
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-6">
          <div className="md:text-left w-full md:w-1/2">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Sprout className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0" />
              <h1 className="text-3xl sm:text-4xl font-bold dark:text-white">
                Connecting Farmers with Highest Paying <CircleDollarSign className="inline-block text-amber-500 mx-1 h-7 w-7 align-middle" /> Wholesalers
              </h1>
            </div>
            
            <div className="mt-4 flex items-start gap-2">
              <Globe className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
              <p className="text-lg dark:text-gray-200 text-left">
                A premium marketplace where farmers showcase their quality produce and wholesalers pay for the best agricultural products.
              </p>
            </div>
            
            <div className="mt-6 flex flex-wrap md:justify-start justify-center gap-4">
              {isLogin ? (<></>): (<>
              <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white flex items-center gap-2 px-4 py-2 h-auto">
                <Users className="h-4 w-4" /> Start Selling Your Produce
              </Button>
              </Link>
              </>)}
              <Link to="/marketplace">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-300 dark:hover:bg-green-900/30 flex items-center gap-2 px-4 py-2 h-auto">
                <Package className="h-4 w-4" /> Discover Products
              </Button>
              </Link>
            </div>
            
            <div className="mt-4 flex items-center gap-1 justify-center md:justify-start">
              <Leaf className="h-4 w-4 text-green-500" /> 
              <p className="text-sm dark:text-gray-300">1,000+ farmers already on our platform</p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative overflow-visible group w-full max-w-md">
              <img 
                ref={imageRef}
                src="img/home.jpg" 
                alt="Farmers Market" 
                className="rounded-lg shadow-md w-full dark:shadow-emerald-500/10 dark:border dark:border-gray-700 hover:shadow-xl dark:hover:shadow-emerald-500/20 transition-all duration-300"
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <div className="absolute inset-0 group-hover:bg-green-500/5 dark:group-hover:bg-emerald-400/10 rounded-lg transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Tractor className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0" />
          <h2 className="text-3xl font-bold dark:text-white">
            Transform How You Sell Your Agricultural Products
          </h2>
        </div>
        
        <p className="mt-4 text-lg dark:text-gray-200 max-w-3xl mx-auto">
          Our sophisticated platform connects farmers directly with wholesalers through a transparent platform.
        </p>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700 dark:shadow-md dark:shadow-emerald-900/5 hover:shadow-lg transition-all duration-200 h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4 flex items-center justify-center">
                <HandCoins className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                Competitive Pricing
              </h3>
              <p className="mt-3 dark:text-gray-200">Let wholesalers compete for your products through our transparent open market operation.</p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:border-gray-700 dark:shadow-md dark:shadow-emerald-900/5 hover:shadow-lg transition-all duration-200 h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                Quality Verification
              </h3>
              <p className="mt-3 dark:text-gray-200">Our strict verification process ensures buyers trust your product claims.</p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:border-gray-700 dark:shadow-md dark:shadow-emerald-900/5 hover:shadow-lg transition-all duration-200 h-full">
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-4 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                Market Insights
              </h3>
              <p className="mt-3 dark:text-gray-200">Access real-time analytics and market trends to make informed decisions.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="container mx-auto py-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <CalendarDays className="h-8 w-8 text-blue-500 dark:text-blue-400 flex-shrink-0" />
          <h2 className="text-3xl font-bold dark:text-white">
            Suggested Government Schemes
          </h2>
        </div>
        
        <div className="relative overflow-hidden rounded-xl shadow-lg" ref={carouselRef}>
          {/* Carousel slides */}
          <div 
            className="flex transition-transform duration-500 ease-out h-[400px] md:h-[500px]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div key={image.id} className="min-w-full h-full relative">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">{image.caption}</h3>
                  <p className="text-white/90 mt-2">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 p-3 rounded-full backdrop-blur-sm text-white shadow-lg transition-all hover:scale-105"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 p-3 rounded-full backdrop-blur-sm text-white shadow-lg transition-all hover:scale-105"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
              <button 
                key={index}
                className={`h-2 transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50 w-2'} rounded-full`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto py-16 text-center bg-green-100/50 dark:bg-gray-800/50 rounded-xl px-4 md:px-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sun className="h-8 w-8 text-amber-500 dark:text-amber-400 flex-shrink-0" />
          <h2 className="text-3xl font-bold dark:text-white">
            How Our Market Place Works
          </h2>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 mb-4 flex items-center justify-center">
              <Users className="h-10 w-10 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-lg font-medium dark:text-white">Create Your Account</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Quick and secure registration process</p>
          </div>
          
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 mb-4 flex items-center justify-center">
              <Package className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-medium dark:text-white">List Your Products</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Showcase your best agricultural produce</p>
          </div>
          
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-4 mb-4 flex items-center justify-center">
              <HandCoins className="h-10 w-10 text-amber-500 dark:text-amber-400" />
            </div>
            <p className="text-lg font-medium dark:text-white">Receive & Accept</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Get competitive offers for your products</p>
          </div>
        </div>  
      </section>
    </div>
        </>
    )
}