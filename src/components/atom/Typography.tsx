import { Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useCallback } from "react";

export function Typography({
  children,
  mode,
  className,
}: {
  children: React.ReactNode;
  mode?: "title" | "subtitle" | "body" | "error";
  className?: string;
}) {
  const { colorMode } = useColorMode();

  const commonClasses = `${colorMode === "dark" ? "text-primary-100" : "text-primary-900"
    } `;

  const getText = () => {
    switch (mode) {
      case "title":
        return (
          <Heading className={commonClasses + className} as={"h1"} size={"lg"}>
            {children}
          </Heading>
        );
      case "subtitle":
        return (
          <Heading className={commonClasses + className} as={"h2"} size={"md"}>
            {children}
          </Heading>
        );
      case "error":
        return (
          <Text className={commonClasses + className + "w-full text-center py-2"} size={"sm"} color={"error"}>
            {children}
          </Text>
        );
      default:
        return (
          <Text className={commonClasses + className} size={"sm"}>
            {children}
          </Text>
        );
    }
  };

  return getText();
}
