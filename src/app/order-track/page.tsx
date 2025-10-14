import React from 'react'
import { Metadata } from "next";
import { ORDER_TRACKING_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: ORDER_TRACKING_META.title,
  description: ORDER_TRACKING_META.meta_description,
  keywords: ORDER_TRACKING_META.meta_keywords,
};


function OrderTrack() {
  return (
    <div>
      
    </div>
  )
}

export default OrderTrack