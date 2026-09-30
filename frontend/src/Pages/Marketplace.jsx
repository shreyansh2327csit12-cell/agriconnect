import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import AuctionList from "@/src/components/ProductList.jsx";
import { getAuctions } from "../http/api";
import useTokenStore from "@/src/http/store";
// import { getAuctions } from "@/src/http/api";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("ending-soon");
  const role = "farmer"; // useTokenStore((state) => state.role);
  const [auctionList, setAuctionList] = useState([]);
  const [filteredAllAuctions, setFilteredAllAuctions] = useState([]);
  const [filteredMyAuctions, setFilteredMyAuctions] = useState([]);

  const filterAuctions = (auctions) => {
    return auctions.filter((auction) => {
      const matchesSearch =
        auction.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auction.farmerId.name.toLowerCase().includes(searchQuery.toLowerCase())||
        auction.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || auction.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const sortAuctions = (auctions) => {
    return [...auctions].sort((a, b) => {
      switch (sortOption) {
        case "ending-soon":
          return a.timeLeft - b.timeLeft;
        case "price-low":
          return a.currentBid - b.currentBid;
        case "price-high":
          return b.currentBid - a.currentBid;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    if (auctionList.length) {
      setFilteredAllAuctions(sortAuctions(filterAuctions(auctionList)));
    }
  }, [searchQuery, categoryFilter, sortOption, auctionList]);

    useEffect(() => {
      const fetchAuctions = async () => {
        try {
          const response = await getAuctions();
          setAuctionList(response);
          setFilteredAllAuctions(response);
        } catch (error) {
          console.error("Error fetching auctions:", error);
        }
      };
      fetchAuctions();
    }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">
            Browse and manage agricultural products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by product or farmer name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="grains">Grains & Cereals</SelectItem>
              <SelectItem value="dairy">Dairy Products</SelectItem>
              <SelectItem value="meat">Meat & Poultry</SelectItem>
              <SelectItem value="nuts">Nuts & Seeds</SelectItem>
              <SelectItem value="herbs">Herbs & Spices</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAllAuctions.length > 0 ? (
        <AuctionList auctions={filteredAllAuctions} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No auctions found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
