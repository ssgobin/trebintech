"use client";

import { lazy, Suspense } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  tintColor?: string;
}

export function SplineScene({ scene, className, tintColor }: SplineSceneProps) {
  const handleLoad = (spline: Application) => {
    if (!tintColor) return;

    spline.getAllObjects().forEach((object) => {
      if (object.material) {
        object.color = tintColor;
      }
    });
  };

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="spline-loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={handleLoad} />
    </Suspense>
  );
}
