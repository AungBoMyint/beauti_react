import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { Controller } from "react-hook-form";
import { Field } from "../ui/field";

interface Item {
  label: string;
  value: string;
}
interface Props {
  name: string;
  items: Item[];
  errors: any;
  control: any;
  placeholder: string;
  label: string;
}
function SelectInput({
  items,
  errors,
  control,
  name,
  placeholder,
  label,
}: Props) {
  const collection = createListCollection({
    items: items?.map((item) => ({
      label: item.label,
      value: item.value,
    })),
  });
  return (
    <Field
      label={label}
      invalid={!!errors.framework}
      errorText={errors.framework?.message}
      width="320px"
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={collection}
          >
            <SelectTrigger>
              <SelectValueText placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {collection.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </Field>
  );
}

export default SelectInput;
