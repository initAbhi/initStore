// app/(with-navbar)/products/page.tsx
import React, { Suspense } from "react";
import ProductsPage from "./Prodcuts";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
