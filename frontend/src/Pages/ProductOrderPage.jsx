
import { updateAuction, updateStatus } from "../http/api";
import CountdownTimer from "../components/CountDownTimer";

import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
import {
  Clock,
  Award,
  ArrowUp,
  Users,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
// import BidHistory from "@/app/bid-history";
// import CountdownTimer from "@/app/countdown-timer";

import { placeBid, updateBid, useSocket } from "@/src/socket/socket.js";
import { data, useParams } from "react-router-dom";
import { getAuctionById, getFarmerById } from "@/src/http/api";
import useTokenStore from "../http/store";
import BidHistory from "../components/BidHistory";

const initialProduct = {
  id: "prod-123",
  name: "Premium Organic Apples",
  description:
    "Fresh, organic apples harvested from sustainable orchards. Perfect for retail stores and restaurants.",
  farmer: {
    name: "Green Valley Farms",
    location: "Riverside County",
    rating: 4.8,
    image: "/placeholder.svg?height=50&width=50",
  },
  quantity: "500 kg",
  minBid: 1200,
  currentBid: 1350,
  bidIncrement: 50,
  timeLeft: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
  images: [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg?height=1000&width=1500",
    "img/4.jpg?height=400&width=600",
  ],
  category: "Fruits",
  quality: "Grade A",
  harvestDate: "2023-10-15",
};



const ProductOrderPage = () => {
      const { id } = useParams();
    
      const socket = useSocket(id);
    
      const [userId, setUserId] = useState("");
      const [product, setProduct] = useState(initialProduct);
      const [auction, setAuction] = useState();
      const [currentBid, setCurrentBid] = useState();
      const [farmer, setFarmer] = useState();
      const [bids, setBids] = useState();
      const [bidAmount, setBidAmount] = useState();
      const [timeLeft, setTimeLeft] = useState();
      const [activeImage, setActiveImage] = useState(0);
      const [showAllBidders, setShowAllBidders] = useState(false);

      const updateBidCallback = async (data) => {
        console.log("Callback:", data);
        setCurrentBid(data.currentBid);
        setBids(data.highestBidder);
      };

      const calculateTimeLeft = (endTime) => {
        const now = new Date().getTime(); // Current time in milliseconds
        const endTimeMs = new Date(endTime).getTime(); // Auction end time in milliseconds
        const difference = endTimeMs - now; // Remaining time in milliseconds
        if (difference <= 0 && auction?.status === "open") {
          updateStatus(id);
          auction.status = "closed";
        }
        console.log(
          "Now: ",
          now,
          "End time: ",
          endTimeMs,
          "Difference: ",
          difference
        );
        return difference > 0 ? difference : 0;
      };

      useEffect(() => {
        updateBid(socket, updateBidCallback);
      }, [socket]);

      useEffect(() => {
        // Fethc user id from localstorage
        const userId = useTokenStore.getState().userId;
        setUserId(userId);
        const fetchAuction = async () => {
          try {
            const response = await getAuctionById(id);
            setAuction(response);
            console.log(response.highestBidder);
            setBids(response.highestBidder);
            setCurrentBid(response.currentBid);
            setBidAmount(response.minBidIncrement + response.startingBid);
            // setProduct(response);
            // console.log(product);
            if (response.farmerId) {
              const farmerData = await getFarmerById(response.farmerId);
              setFarmer(farmerData);
            }
          } catch (error) {
            console.error("Error fetching auction:", error);
          }
        };
    
        fetchAuction();
      }, []);

      useEffect(() => {
        if (auction) {
          const updateTimer = () => {
            const endTime = new Date(auction.updatedAt);
            console.log("End time before: ", endTime);
            endTime.setDate(endTime.getDate(endTime) + auction.duration);
            console.log("End time after: ", endTime);
            setTimeLeft(calculateTimeLeft(endTime));
          };
      
          updateTimer(); // Initial call
      
          const interval = setInterval(updateTimer, 5000);
      
          return () => clearInterval(interval); // Cleanup on unmount
        }
      }, [auction]);

       const handleBidSubmit = (e) => {
          e.preventDefault();
      
          if (bidAmount <= product.currentBid) {
            alert("Your bid must be higher than the current bid");
            return;
          }
      
          placeBid(socket, id, bidAmount, userId);
      
          // In a real app, you would send this bid to your API
      
          setBidAmount(bidAmount + auction?.minBidIncrement);
        };



  return (
    <>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className=" rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-[300px] md:h-[400px] w-full">
                  <img
                    src={auction?.images[activeImage] || "/placeholder.svg"}
                    alt={auction?.product}
                    className="object-fill h-fit w-full"
                  />
                </div>
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {auction?.images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative h-20 w-20 flex-shrink-0 cursor-pointer border-2 rounded ${
                        activeImage === index
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${auction?.product} view ${index + 1}`}
                        className="object-cover rounded h-[100%] w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
    
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="details">
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Product Details</TabsTrigger>
                      <TabsTrigger value="farmer">Farmer Info</TabsTrigger>
                      <TabsTrigger value="shipping">Shipping & Pickup</TabsTrigger>
                    </TabsList>
    
                    <TabsContent value="details" className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">Description</h3>
                        <p className="text-muted-foreground">
                          {auction?.description}
                        </p>
                      </div>
    
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Category
                          </h4>
                          <p>{auction?.category}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Quality
                          </h4>
                          <p>{auction?.quality}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Quantity
                          </h4>
                          <p>
                            {auction?.quantity} {auction?.unit.toUpperCase()}{" "}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Harvest Date
                          </h4>
                          <p>{product.harvestDate}</p>
                        </div>
                      </div>
                    </TabsContent>
    
                    <TabsContent value="farmer">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={product.farmer.image}
                            alt={product.farmer.name}
                          />
                          <AvatarFallback>{farmer?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{farmer?.name}</h3>
                          <p className="text-muted-foreground">
                            Riverside County{" "}
                            {/* {product.farmer.location} this need to be done later*/}
                          </p>
                          <div className="flex items-center mt-2">
                            <Award className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">
                              4.8 {/* {product.farmer.rating} */}
                            </span>
                            <span className="text-muted-foreground ml-1">
                              /5 Rating
                            </span>
                          </div>
{/*                           
                          <Button variant="outline" size="sm" className="mt-3">
                            View Profile
                          </Button> */}
                        </div>
                      </div>
                    </TabsContent>
    
                    <TabsContent value="shipping">
                      <div className="space-y-4">
                        <p>
                          Shipping and pickup options will be finalized after the
                          auction ends. The farmer typically offers:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Farm pickup (free)</li>
                          <li>Local delivery within 50 miles (fee varies)</li>
                          <li>Shipping arrangements for long-distance buyers</li>
                        </ul>
                        <p className="text-muted-foreground text-sm mt-4">
                          Note: Exact shipping costs and logistics will be discussed
                          with the farmer after winning the bid.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
    
            {/* Bidding Section */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold">{auction?.product}</h1>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {auction?.category}
                      </Badge>
                      <span className="text-muted-foreground text-sm ml-2">
                        {auction?.quantity} {auction?.unit.toUpperCase()}
                      </span>
                    </div>
                  </div>
    
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Price</p>
                        <p className="text-3xl font-bold">
                          ₹{currentBid?.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Starting Price
                        </p>
                        <p className="text-xl">
                          ₹{auction?.startingBid.toLocaleString()}
                        </p>
                      </div>
                    </div>
    
                    <div className="flex items-center gap-2 text-amber-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Trade ending in:
                      </span>
                    </div>
    
                    {auction && timeLeft && auction?.status === "open" ? (
                      <CountdownTimer initialTimeInMs={timeLeft} />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Trade has ended
                      </p>
                    )}
    
                    <Progress
                      value={
                        (auction?.currentBid / (auction?.minBidIncrement * 2)) * 100
                      }
                      className="h-2"
                    />
  
                  </div>
    
                  <form onSubmit={handleBidSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="bid-amount" className="text-sm font-medium">
                        Your Price (INR)
                      </label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          ₹
                        </span>
                        <Input
                          id="bid-amount"
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(Number(e.target.value))}
                          className="pl-7"
                          min={product.currentBid + 1}
                          step={1}
                          required
                        />
                      </div>
                    </div>
    
                    <Button type="submit" className="w-full" size="lg">
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Your Offer
                    </Button>
    
                  </form>
                </CardContent>
              </Card>
    
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Applicants
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllBidders(!showAllBidders)}
                      className="h-8 px-2"
                    >
                      {showAllBidders ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Show All
                        </>
                      )}
                    </Button>
                  </div>
    
                  <BidHistory bids={bids} />
    
                  {!showAllBidders && bids?.length > 3 && (
                    <p className="text-sm text-center text-muted-foreground mt-3">
                      + {bids?.length - 3} more bidders
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </>
  )
}

export default ProductOrderPage