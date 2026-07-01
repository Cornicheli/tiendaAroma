"use client";

import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "onLoad"> & {
  className?: string;
};

export function ProductImage({ className, ...rest }: Props) {
  return <Image {...rest} className={className} />;
}
