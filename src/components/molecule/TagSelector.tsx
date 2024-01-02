import { Button } from "@chakra-ui/react";
import React from "react";

export function TagSelector({
  tag,
  setTag,
  tags,
}: {
  tag: string;
  setTag: (tag: string) => void;
  tags: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        bgColor={tag === "" ? "primary.50 !important" : undefined}
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
          bgColor={tag === t ? "primary.50 !important" : undefined}
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
