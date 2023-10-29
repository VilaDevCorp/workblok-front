import React from "react";
import { Typography } from "../atom/Typography";

export function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Typography className="self-start" mode="title">
        {title}
      </Typography>
      <div>
        {children}
      </div>
    </div>
  );
}
