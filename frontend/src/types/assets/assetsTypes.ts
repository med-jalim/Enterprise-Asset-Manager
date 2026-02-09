

type AssetStatus = "Active" | "Under Review" | "Archived";

interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  status: AssetStatus;
}

type AssetFormValues = {
  name: string;
  serialNumber: string;
  category: string;
  status: AssetStatus;
};


export type { Asset, AssetStatus,AssetFormValues };