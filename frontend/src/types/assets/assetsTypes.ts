

type AssetStatus = "Active" | "Under Review" | "Archived";

interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  type: string;
  status: AssetStatus;
}


export type { Asset, AssetStatus };