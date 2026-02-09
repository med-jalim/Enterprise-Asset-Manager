import type { Asset, AssetFormValues, AssetStatus } from "@/types/assets/assetsTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {  useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AssetFormProps = {
  initialValues?: Partial<
    Pick<Asset, "name" | "serialNumber" | "category" | "status">
  >;
  onSubmit?: (values: AssetFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
};

const STATUS_OPTIONS: AssetStatus[] = ["Active", "Under Review", "Archived"];

const defaultValues: AssetFormValues = {
  name: "",
  serialNumber: "",
  category: "",
  status: "Active",
};

export default function AssetForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save Asset",
  className,
  isOpen,
  onOpenChange,
  title = "Asset Details",
}: AssetFormProps) {
  const [values, setValues] = useState<AssetFormValues>({
    ...defaultValues,
    ...initialValues,
  });



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(values);
    setValues(defaultValues);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Separator />
        <form className={cn("grid gap-6 pt-4", className)} onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="asset-name">
                Asset Name
              </label>
              <Input
                id="asset-name"
                placeholder="Server Rack A1"
                value={values.name}
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="asset-serial">
                Serial Number
              </label>
              <Input
                id="asset-serial"
                placeholder="SN-2026-001"
                value={values.serialNumber}
                name="serialNumber"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="asset-category">
                Asset Category
              </label>
              <Input
                id="asset-category"
                placeholder="Infrastructure"
                value={values.category}
                name="category"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none" htmlFor="asset-status">
                Status
              </label>
              <select
                id="asset-status"
                value={values.status}
                name="status"
                onChange={handleChange}
                className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                )}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
