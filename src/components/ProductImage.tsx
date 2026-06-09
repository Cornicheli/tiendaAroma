"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<ImageProps, "onLoad"> & {
  className?: string;
};

export function ProductImage({ className, ...rest }: Props) {
  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <Image
      {...rest}
      onLoad={(e) => {
        const t = e.currentTarget;
        setIsLandscape(t.naturalWidth > t.naturalHeight);
      }}
      className={cn(className, isLandscape && "rotate-90")}
    />
  );
}
