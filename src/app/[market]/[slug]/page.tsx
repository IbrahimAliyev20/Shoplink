
import SingleProductPage from '@/components/market/components/SingleMarketPage';
import React from 'react';

const SingleProduct = ({ params }: { params: { slug: string } }) => {
  return (
    <div className='container mx-auto px-4 max-md:px-3'>
      <SingleProductPage slug={params.slug} />
    </div>
  );
};

export default SingleProduct;