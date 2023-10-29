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
          <Heading className={className} as={"h1"} size={"md"}>
            {children}
          </Heading>
        );
      case "subtitle":
        return (
          <Heading className={className} as={"h2"} size={"lg"}>
            {children}
          </Heading>
        );
      default:
        return (
          <Text className={className} size={"md"}>
            {children}
          </Text>
        );
    }
  };

  return getText();
}
