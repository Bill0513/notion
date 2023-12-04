"use client";

import { Id } from "@/convex/_generated/dataModel";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  return <div>Banner</div>;
};
