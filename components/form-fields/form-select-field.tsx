import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SelectOption } from "@/types";

type FormSelectFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
};

/**
 * NOTE: This component is ready to use when wrapped with FormProvider from RHF
 */
export const FormSelectField = ({
  name,
  label,
  placeholder,
  options,
}: FormSelectFieldProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>

      <Select
        value={value ?? undefined}
        onValueChange={(value) =>
          setValue(name, value, { shouldValidate: true, shouldDirty: true })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};
