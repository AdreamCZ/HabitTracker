import { type HTMLProps } from "react";
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
  name: string;
  label?: string;
};

/**
 * NOTE: This component is ready to use when wrapped with FormProvider from RHF
 */
export const FormTextField = ({
  name,
  label,
  ...inputProps
}: FormTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="flex flex-col gap-2 mb-4">
      <Label htmlFor={name}>{label}</Label>

      <Input
        {...inputProps}
        {...register(name)}
        className={cn(inputProps.className, error && "border-destructive")}
      />

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};
