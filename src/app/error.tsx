"use client";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <header>
        <div className="mb-4 max-w-3xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Oops something went wrong!
          </h1>
          <h2 className="text-sm text-gray-500">
            Please try refreshing the page, or contact support if the problem
            persists.
          </h2>
        </div>
      </header>
    </div>
  );
}
