"use client";

import dynamic from "next/dynamic";

const StepperComponent = dynamic(() => import("./components/custom-stepper"), {
  ssr: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StepperComponent />
      {children}
    </>
  );
}
