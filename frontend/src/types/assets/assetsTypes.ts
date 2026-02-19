

type AssetStatus = "Active" | "Under Review" | "Archived";

type employee={
  id: number;
  name: string;
}

interface Asset {
  id: number;
  name: string;
  serialNumber: string;
  category: string;
  status: AssetStatus;
  employee?: employee;
}

type AssetFormValues = {
  name: string;
  serialNumber: string;
  category: string;
  status: AssetStatus;
  employeeId: string;
};


export type { Asset, AssetStatus,AssetFormValues, employee };