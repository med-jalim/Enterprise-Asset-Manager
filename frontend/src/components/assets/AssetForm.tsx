import type {
  Asset,
  AssetFormValues,
  AssetStatus,
  employee,
} from "@/types/assets/assetsTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeeService } from "@/services/employees/employeeService";

type AssetFormProps = {
  initialValues?: Partial<
    Pick<Asset, "name" | "serialNumber" | "category" | "status" | "employee">
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
  employeeId: "",
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
  const [employees, setEmployees] = useState<employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const employees = await employeeService.getEmployees();
      setEmployees(employees.content || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (name: string, value: string) => {
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
        <form
          className={cn("grid gap-6 pt-4", className)}
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="asset-name"
              >
                Asset Name
              </label>
              <Input
                id="asset-name"
                placeholder="Server Rack A1"
                value={values.name}
                name="name"
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="asset-serial"
              >
                Serial Number
              </label>
              <Input
                id="asset-serial"
                placeholder="SN-2026-001"
                value={values.serialNumber}
                name="serialNumber"
                onChange={(e) => handleChange("serialNumber", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="asset-category"
              >
                Asset Category
              </label>
              <Input
                id="asset-category"
                placeholder="Infrastructure"
                value={values.category}
                name="category"
                onChange={(e) => handleChange("category", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="asset-status"
              >
                Status
              </label>
              <select
                id="asset-status"
                value={values.status}
                name="status"
                onChange={(e) => handleChange("status", e.target.value)}
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
              <label
                className="text-sm font-medium leading-none"
                htmlFor="employeeId"
              >
                Assigned Employee
              </label>
              <Select
                value={values.employeeId}
                onValueChange={(value) => handleChange("employeeId", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees?.map((employee) => (
                    <SelectItem
                      key={employee.id}
                      value={employee.id.toString()}
                    >
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
