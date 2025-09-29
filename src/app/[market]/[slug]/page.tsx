
import SingleProductPage from '@/components/market/components/SingleMarketPage';
import React from 'react';

const SingleProduct = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div className='container mx-auto px-4 max-md:px-3'>
      <SingleProductPage slug={slug} />
    </div>
  );
};

export default SingleProduct;