import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  placeholder: string;

  options: string[];

  onValueChange?: (
    value: string
  ) => void;
}

const CustomSelect = ({
  placeholder,
  options,
  onValueChange,
}: CustomSelectProps) => {
  return (
    <Select
      onValueChange={
        onValueChange
      }
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            placeholder
          }
        />
      </SelectTrigger>

      <SelectContent>
        {options.map(
          (option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;