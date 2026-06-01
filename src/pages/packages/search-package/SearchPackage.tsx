import {
  Search,
  Package,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import { toast } from "react-toastify";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  searchShipmentRequests,
  receiveShipmentRequest,
} from "@/services/search-package.service";

export default function WarehouseReceive() {
  const [search, setSearch] = useState("");

  const [packages, setPackages] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [selectedPackage, setSelectedPackage] =
    useState<any>(null);

  const [weight, setWeight] = useState("");

  const [remarks, setRemarks] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPackages();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const fetchPackages = async () => {
    try {
      setLoading(true);

      const response =
        await searchShipmentRequests(search);

      setPackages(response?.data || []);
    } catch (error) {
      toast.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  const handleReceive = async () => {
    if (!selectedPackage) return;

    try {
      setSubmitting(true);

      await receiveShipmentRequest(
        selectedPackage.id,
        {
          actual_weight_lb: Number(weight),
          admin_remarks: remarks,
        }
      );

      toast.success(
        "Package marked as received"
      );

      setSelectedPackage(null);

      setWeight("");

      setRemarks("");

      fetchPackages();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update package"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Warehouse Package Receiving
        </h1>

        <p className="text-muted-foreground">
          Search incoming packages and
          mark them as received.
        </p>
      </div>

      {/* Search */}

      <Card className="rounded-3xl shadow-md border-0">
        <CardContent className="p-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-muted-foreground"
            />

            <Input
              placeholder="Search tracking number..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-11 h-12 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading */}

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      )}

      {/* Results */}

      {!loading && packages.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-2">
          {packages.map((item) => (
            <Card
              key={item.id}
              className="rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Package size={18} />

                      <h3 className="font-bold text-lg">
                        {
                          item.tracking_number
                        }
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                      Customer:
                      {" "}
                      {item.customer_name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Warehouse:
                      {" "}
                      {item.warehouse_name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Status:
                      {" "}
                      {item.status}
                    </p>
                  </div>

                  <Button
                    onClick={() =>
                      setSelectedPackage(item)
                    }
                    className="rounded-xl"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />

                    Package Received
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading &&
        packages.length === 0 && (
          <Card className="rounded-3xl">
            <CardContent className="p-12 text-center">
              <Package
                size={50}
                className="mx-auto mb-4 text-muted-foreground"
              />

              <h3 className="font-semibold text-lg">
                No Packages Found
              </h3>

              <p className="text-muted-foreground">
                Search for a tracking
                number to locate a package.
              </p>
            </CardContent>
          </Card>
        )}

      {/* Receive Dialog */}

      <Dialog
        open={!!selectedPackage}
        onOpenChange={() =>
          setSelectedPackage(null)
        }
      >
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>
              Mark Package Received
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Actual Weight (LB)"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />

            <Input
              placeholder="Admin Remarks"
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
            />

            <Button
              onClick={handleReceive}
              disabled={submitting}
              className="w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Receive"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}