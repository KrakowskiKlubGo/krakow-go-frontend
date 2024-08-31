import * as React from "react";
import { Suspense } from "react";
import Contact from "@/app/kontakt/_components/contact";

export default function Page() {
  return (
    <>
      <Suspense>
        <Contact />
      </Suspense>
    </>
  );
}
