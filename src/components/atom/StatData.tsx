import React from "react";

export function StatData({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex align-middle items-center justify-between ">
      <span className="">{label} </span>
      {typeof value === "string" ? (
        <span className="text-lg font-bold">{value}</span>
      ) : (
        value
      )}
    </div>
  );
}
