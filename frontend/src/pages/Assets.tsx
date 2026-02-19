import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Asset, AssetFormValues } from "@/types/assets/assetsTypes";
import { assetService } from "@/services/assets/assetService";
import AssetTable from "@/components/assets/AssetTable";
import AssetForm from "@/components/assets/AssetForm";
import { useState, useEffect } from "react";

// --- Main Page Component ---

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const assets = await assetService.getAssets();
      setAssets(assets.content || []);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      setError("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleAddAsset = async (newAsset: AssetFormValues) => {
    try {
      setIsSubmitting(true);
      const createdAsset = await assetService.createAsset(newAsset);
      setAssets((prev) => [...prev, createdAsset]);
    } catch (error) {
      fetchAssets();
      console.error("Failed to add asset:", error);
      setError("Failed to add asset");
      setIsFormOpen(false);
    } finally {
      setIsFormOpen(false);
      setIsSubmitting(false);
    }
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex flex-col gap-6 p-8 w-full   dark:bg-gray-900/50">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's assets.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsFormOpen(true)}>
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
            {error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <AssetTable assets={filteredAssets} isLoading={loading} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Asset Form Modal */}
      <AssetForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        title="Add Asset"
        onCancel={() => setIsFormOpen(false)}
        onSubmit={handleAddAsset}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
