import React from "react";
import { Typography } from "../atom/Typography";

export function Section({
  children,
  title,
  containerClasses,
}: {
  children: React.ReactNode;
  title?: string;
  containerClasses?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Typography className="self-start" mode="title">
        {title}
      </Typography>
      <div className={containerClasses}>{children}</div>
    </div>
  );
}
