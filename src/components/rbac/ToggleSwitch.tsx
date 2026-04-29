import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const ToggleSwitch = ({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: ToggleSwitchProps) => {
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="data-[state=checked]:bg-green-600"
      />
      {label && <Label className="cursor-pointer text-sm">{label}</Label>}
    </div>
  );
};
