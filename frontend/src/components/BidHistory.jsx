
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";

const avatar = "";

export default function BidHistory({ bids }) {
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
          <p className="font-semibold">₹{bid?.amount.toLocaleString()}</p>
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
