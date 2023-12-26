import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useId } from "react";

export function FormField({
  label,
  input,
}: {
  label: string;
  input: React.ReactNode;
}) {
  const id = useId();

  return (
    <FormControl>
      <FormLabel className="!text-lg">{label}</FormLabel>
      {input}
    </FormControl>
  );
}
