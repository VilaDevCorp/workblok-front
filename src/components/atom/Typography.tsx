import { Heading, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";

export function Typography({
  children,
  mode,
  className,
}: {
  children: React.ReactNode;
  mode?: "title" | "subtitle" | "body";
  className?: string;
}) {
  const getText = () => {
    switch (mode) {
      case "title":
        return (
          <Heading className={className} as={"h1"} size={"lg"}>
            {children}
          </Heading>
        );
      case "subtitle":
        return (
          <Heading className={className} as={"h2"} size={"md"}>
            {children}
          </Heading>
        );
      default:
        return (
          <Text className={className} size={"sm"}>
            {children}
          </Text>
        );
    }
  };

  return getText();
}
