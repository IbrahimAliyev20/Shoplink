import React from "react";
import OrderTrack from "@/components/market/ordertrack/OrderTrack";
import { Metadata } from "next";
import { ORDER_DETAILS_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: ORDER_DETAILS_META.title,
  description: ORDER_DETAILS_META.meta_description,
  keywords: ORDER_DETAILS_META.meta_keywords,
};

function OrderTrackPage() {
  return (
    <div>
      <OrderTrack />
    </div>
  );
}

export default OrderTrackPage;
