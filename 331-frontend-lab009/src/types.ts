// types.ts
export interface Bid {
  id: number;
  amount: number;         // Double -> number
  datetime: string;       // LocalDateTime -> ISO string (e.g. "2025-09-22T14:30:00")
  // อย่าใส่ AuctionItem ตรงนี้เพื่อหลีกเลี่ยงวงวน JSON
  itemId?: number;        // ถ้าต้องการอ้างอิงกลับไปยัง item (backend ต้องส่ง item_id หรือ DTO)
}

export interface AuctionItem {
  id: number;
  description: string;
  type: string;

  
  bids?: Bid[];                  
  successfulBid?: Bid | null;    
}

// ถ้าต้องการแยกระดับความ detail (แนะนำ)
export interface AuctionItemSummary {
  id: number;
  description: string;
  type: string;
}


export interface AuctionItemDetail extends AuctionItemSummary {
  bids: Bid[];
  successfulBid: Bid | null;
}

