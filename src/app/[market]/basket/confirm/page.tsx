import ConfirmPage from "@/components/market/confirm/ConfirmPage";
import { Metadata } from "next";
import { MARKET_BASKET_CONFIRM_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: MARKET_BASKET_CONFIRM_META.title,
  description: MARKET_BASKET_CONFIRM_META.meta_description,
  keywords: MARKET_BASKET_CONFIRM_META.meta_keywords,
};

function Confirm() {
  return <ConfirmPage />;
}

export default Confirm;