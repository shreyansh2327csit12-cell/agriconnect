import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, BarChart2, Eye } from "lucide-react";
// import { getAuctions } from "@/http/api";
// import useTokenStore from "@/http/store";

export default function ProductList({ auctions, showManageOptions = false }) {
  // const role = useTokenStore((state) => state.role);
  // console.log(role);
  // const [auctions, setAuctions] = useState([{
  //   _id: "1",
  //   product: "Wheat",
  //   farmer: { name: "John Doe" },
  //   category: "Grains",
  //   currentBid: 1000,
  //   highestBidder: ["User1", "User2"],
  //   reserveMet: false,
  //   timeLeft: 3600,
  //   createdAt: new Date().toISOString(),
  //   images: ["img/1.jpg"],
  // }]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auctions.map((auction) => (
        <Card key={auction._id} className="overflow-hidden p-0">
          <div className="relative">
            <div className="relative h-72 w-full">
              <img
                src={auction.images[0] || "img/1.jpg"}
                alt={auction.description}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-2 right-2">
              <Badge
                variant="outline"
                className="bg-white/90 text-black font-medium"
              >
                {auction.category}
              </Badge>
            </div>
            {auction.reserveMet === false && (
              <div className="absolute bottom-2 right-2">
                <Badge variant="outline" className="bg-amber-500/90 text-white">
                  Reserve not met
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-4 pt-0">
            <div className="mb-2">
              <h3 className="font-semibold text-2xl line-clamp-1">
                {auction.product}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                by {auction.farmerId.name}
              </p>
            </div>

            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-lg font-bold">
                  ₹{auction.currentBid.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Apply</p>
                <p className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {auction.highestBidder.length}
                </p>
              </div>
            </div>

            {showManageOptions ? (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <a
                    href={`/auctions/${auction._id}`}
                    className="flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <a
                    href={`/auctions/${auction._id}/stats`}
                    className="flex items-center"
                  >
                    <BarChart2 className="h-4 w-4 mr-1" /> Stats
                  </a>
                </Button>
              </div>
            ) : (
              <Button className="w-full">
                <a href={`/product-order/${auction._id}`}>View Product</a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
