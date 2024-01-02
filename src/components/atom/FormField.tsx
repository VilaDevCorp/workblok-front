import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useId } from "react";

export function FormField({
  label,
  input,
  oneLine,
}: {
  label: string;
  input: React.ReactNode;
  oneLine?: boolean;
}) {
  const id = useId();

  return (
    <FormControl className={`items-center ${oneLine && 'flex justify-between'}`}>
      <FormLabel className={`!text-lg ${oneLine && '!m-0'}`}>{label}</FormLabel>
      {input}
    </FormControl>
  );
}
