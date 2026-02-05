import {
  MoreHorizontal,
  Plus,
  Search,
  FileText,
  Image as ImageIcon,
  Video,
  Box,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assetService } from "@/services/assetService";
import { useState, useEffect } from "react";

// --- Types ---
type AssetStatus = "Active" | "Under Review" | "Archived";
type AssetType = "Image" | "Video" | "Document" | "3D Model";

interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  type: AssetType;
  status: AssetStatus;
}

// --- Helper Components ---

const StatusBadge = ({ status }: { status: AssetStatus }) => {
  const styles = {
    Active:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
    "Under Review":
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
    Archived:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
  };

  return <Badge className={styles[status]}>{status}</Badge>;
};

const TypeIcon = ({ type }: { type: AssetType }) => {
  switch (type) {
    case "Image":
      return <ImageIcon className="h-4 w-4 text-blue-500" />;
    case "Video":
      return <Video className="h-4 w-4 text-purple-500" />;
    case "Document":
      return <FileText className="h-4 w-4 text-orange-500" />;
    case "3D Model":
      return <Box className="h-4 w-4 text-emerald-500" />;
    default:
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
};

// --- Main Page Component ---

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const assets = await assetService.getAssets();
        console.log(assets);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 p-8 w-full  dark:bg-gray-900/50">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground mt-1">
            Manage your digital files, documents, and media.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Asset
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Files</CardTitle>
            <CardDescription>
              A list of all assets currently in the system.
            </CardDescription>
          </div>
          {/* Search Input */}
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="p-2 bg-gray-100 rounded-md dark:bg-gray-800">
                        <TypeIcon type={asset.type} />
                      </div>
                      <div className="flex flex-col">
                        <span>{asset.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{asset.serialNumber}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>
                      <StatusBadge status={asset.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(asset.id)
                            }
                          >
                            Copy Asset ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
