import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Typography } from "../atom/Typography";

export function TagSelector({
  tag,
  setTag,
  tags,
}: {
  tag: string;
  setTag: (tag: string) => void;
  tags: string[];
}) {
  const { colorMode } = useColorMode();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        bgColor={`${
          tag === ""
            ? colorMode === "dark"
              ? "primary.700 !important"
              : "primary.50 !important"
            : ""
        }`}
        border={0}
        variant={"outline"}
        onClick={() => {
          if (tag === "") return;
          setTag("");
        }}
      >
        {"No tag"}
      </Button>
      {tags.map((t) => (
        <Button
          bgColor={`${
            tag === t
              ? colorMode === "dark"
                ? "primary.700 !important"
                : "primary.50 !important"
              : ""
          }`}
          border={0}
          key={`tag_${t}`}
          variant={"outline"}
          onClick={() => {
            if (tag === t) return;
            setTag(t);
          }}
        >
          {t}
        </Button>
      ))}
    </div>
  );
}
