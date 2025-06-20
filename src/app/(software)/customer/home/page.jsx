import React, { Suspense } from "react";
import ClientHomePage from "./ClientHomePage";

export default function CustomerHomePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ClientHomePage />
    </Suspense>
  );
}
