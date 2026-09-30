import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { acceptOrder } from "../http/api";

const avatar = "";

export default function BidHistoryFarmer({ bids }) {
  const [selectedBid, setSelectedBid] = useState(null);


//   setSelectedBid(bid._id)

    const handleOnAccept= async (userId,bidId) => {
        setSelectedBid(bidId);

        try{
            const response = await acceptOrder(userId,bidId);
            console.log(response);
        }
        catch(error){
            console.error(error);
        }
    }
  useEffect(() => {
    console.log(bids);
  }, [bids]);

  return (
    <div className="space-y-3">
      {bids?.map((bid) => (
        <div
          key={bid._id}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt={bid.userName} />
              <AvatarFallback>{bid?.userName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{bid?.userName}</p>
              <p className="text-xs text-muted-foreground">{bid?.bidTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">₹{bid?.amount.toLocaleString()}</p>
            {!selectedBid && (
              <>
                <button onClick={() => handleOnAccept(bid.user,bid._id)} className="text-green-500">
                  <Check size={20} />
                </button>
                <button onClick={() => setSelectedBid(null)} className="text-red-500">
                  <X size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {bids?.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          No bids yet. Be the first to bid!
        </p>
      )}
    </div>
  );
}
