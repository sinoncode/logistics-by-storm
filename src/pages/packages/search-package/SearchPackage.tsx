"use client";

import {
  Search,
  Package,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  Truck,
  MapPin,
  Calendar,
  ArrowRight,
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
  const [search, setSearch] =
    useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [packages, setPackages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedPackage, setSelectedPackage] =
    useState<any>(null);

  const [weight, setWeight] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);

    return () => clearTimeout(timer);
  }, [search]);

  // Initial Load + Search
  useEffect(() => {
    fetchPackages();
  }, [debouncedSearch]);

  const fetchPackages = async () => {
    try {
      setLoading(true);

      const response =
        await searchShipmentRequests(
          debouncedSearch
        );
console.log(response);
     setPackages(
  response?.data || []
);
    } catch (error) {
      // toast.error(
      //   "Failed to fetch shipment requests"
      // );
    } finally {
      setLoading(false);
    }
  };

  const handleReceive = async () => {
    if (!selectedPackage) return;

    if (!weight) {
      toast.error(
        "Please enter package weight"
      );
      return;
    }

    try {
      setSubmitting(true);

      await receiveShipmentRequest(
        selectedPackage.id,
        {
          actual_weight_lb:
            Number(weight),
          admin_remarks: remarks,
        }
      );

      toast.success(
        "Package marked as received successfully"
      );

      setSelectedPackage(null);
      setWeight("");
      setRemarks("");

      fetchPackages();
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to receive package"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusClass = (
    status: string
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";

      case "standby":
        return "bg-red-100 text-red-700 border border-red-200";

      case "booked":
        return "bg-green-100 text-green-700 border border-green-200";

      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 md:p-8">
        <h1 className="text-3xl font-bold">
          Warehouse Receiving
        </h1>

        <p className="text-slate-300 mt-2">
          Search shipment requests and
          mark incoming packages as
          received.
        </p>
      </div>

      {/* Search */}

      <Card className="border-0 shadow-md rounded-3xl">
        <CardContent className="p-5">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search by request number, tracking number, customer name, email..."
              className="pl-11 h-12 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading */}

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      )}

      {/* Empty State */}

      {!loading &&
        packages.length === 0 && (
          <Card className="rounded-3xl border-dashed">
            <CardContent className="py-16 text-center">
              <Package className="h-14 w-14 mx-auto text-muted-foreground mb-4" />

              <h3 className="font-semibold text-xl">
                No Shipment Requests
              </h3>

              <p className="text-muted-foreground mt-2">
                No packages matched your
                search criteria.
              </p>
            </CardContent>
          </Card>
        )}

      {/* Results */}

      {!loading &&
        packages.length > 0 && (
          <div className="grid gap-6 xl:grid-cols-2">
            {packages.map(
              (item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all"
                >
                  <CardContent className="p-0">
                    {/* Top Section */}

                    <div className="bg-slate-50 p-5 border-b">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Package className="h-5 w-5" />

                            <h3 className="font-bold text-lg break-all">
                              {
                                item.request_number
                              }
                            </h3>
                          </div>

                          <p className="text-sm text-muted-foreground mt-2">
                            Supplier Tracking:
                            {" "}
                            <span className="font-medium text-foreground">
                              {
                                item.supplier_tracking_number
                              }
                            </span>
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusClass(
                            item.booking_status
                          )}`}
                        >
                          {
                            item.booking_status
                          }
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-5">
                      {/* Customer */}

                      <div>
                        <h4 className="text-xl font-semibold mb-3">
                          Customer Details
                        </h4>

                        <div className="grid md:grid-cols-2 gap-3 jusitfy-content-between text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />

                            {
                              item.user
                                ?.name
                            }
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />

                            {
                              item.user
                                ?.email
                            }
                          </div>

                          <div className="flex items-end gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />

                            {
                              item.user
                                ?.phone
                            }
                          </div>
                        </div>
                      </div>

                      {/* Shipment */}

                      <div>
                        <h4 className="font-semibold mb-3 text-xl">
                          Shipment Details
                        </h4>

                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />

                            Supplier:
                            {" "}
                            {
                              item.supplier_name
                            }
                          </div>

                          <div>
                            Delivery:
                            {" "}
                            <span className="font-medium capitalize">
                              {
                                item.delivery_type
                              }
                            </span>
                          </div>

                          <div>
                            Payment:
                            {" "}
                            <span className="font-medium capitalize">
                              {
                                item.payment_status
                              }
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />

                            {new Date(
                              item.requested_at
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Route */}

                      <div>
                        <h4 className="font-semibold mb-3 text-xl">
                          Route Information
                        </h4>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="h-4 w-4 text-blue-600" />

                                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                  Origin
                                </span>
                              </div>

                              <p className="font-medium">
                                {
                                  item
                                    .origin_facility
                                    ?.name
                                }
                              </p>
                            </div>

                            <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />

                            <div className="flex-1 w-full">
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="h-4 w-4 text-green-600" />

                                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                  Destination
                                </span>
                              </div>

                              <p className="font-medium">
                                {
                                  item
                                    .destination_facility
                                    ?.name
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expected Arrival */}

                      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                        <p className="text-sm text-blue-700 font-medium">
                          Expected Arrival at
                          Warehouse
                        </p>

                        <p className="text-lg font-bold mt-1">
                          {new Date(
                            item.expected_arrival_at_warehouse
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Action */}

                      <Button
                        onClick={() =>
                          setSelectedPackage(
                            item
                          )
                        }
                        className="w-full h-11 rounded-xl"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Package Received
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}

      {/* Receive Dialog */}

      <Dialog
        open={!!selectedPackage}
        onOpenChange={() =>
          setSelectedPackage(null)
        }
      >
        <DialogContent className="sm:max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle>
              Receive Package
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold">
                  {
                    selectedPackage.request_number
                  }
                </p>

                <p className="text-sm text-muted-foreground">
                  {
                    selectedPackage.user
                      ?.name
                  }
                </p>
              </div>

              <Input
                type="number"
                placeholder="Actual Weight (LB)"
                value={weight}
                onChange={(e) =>
                  setWeight(
                    e.target.value
                  )
                }
              />

              <Input
                placeholder="Admin Remarks"
                value={remarks}
                onChange={(e) =>
                  setRemarks(
                    e.target.value
                  )
                }
              />

              <Button
                onClick={
                  handleReceive
                }
                disabled={
                  submitting
                }
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}