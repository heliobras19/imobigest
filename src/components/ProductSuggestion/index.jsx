import React, { useState } from 'react';
import ProductSuggestionMobile from '../ProductSuggestionMobile';
import ProductSuggestionDesktop from '../ProductSuggestionDesktop';

export default function ProductSuggestionn({ title, description, products }) {

    return (
        <>
        <ProductSuggestionDesktop title={title} description={description} products={products} />
        <ProductSuggestionMobile title={title} description={description} products={products}/>
        </>
    )
}