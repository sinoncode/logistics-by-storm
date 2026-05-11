import { useParams } from "react-router-dom";
import Breadcrumb from "@/layouts/Breadcrumb";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";

import {
  Mail,
  Phone,
  MapPin,
  User,
  ShieldCheck,
  Truck,
  PackageCheck,
  PackageX,
  Clock3,
} from "lucide-react";

import { useLocalStorage } from "@/hooks/useLocalStorage";

const CustomerDetails = () => {
  const { id } = useParams();
  const { members } = useLocalStorage();

  const customer = members.find((m) => m.id === id);

  if (!customer) {
    return (
      <div className="p-6 text-red-500 text-xl font-semibold">
        Customer not found
      </div>
    );
  }

  // Dummy Data
  const shipments = [
    {
      id: "#SHP-1025",
      status: "In Transit",
      date: "12 May 2026",
    },
    {
      id: "#SHP-1026",
      status: "Delivered",
      date: "08 May 2026",
    },
  ];

  const addresses = [
    {
      title: "Home Address",
      address1: "Sector 62",
      address2: "Noida Extension",
      country: "India",
      pincode: "201301",
    },
    {
      title: "Office Address",
      address1: "Cyber City",
      address2: "Gurugram",
      country: "India",
      pincode: "122002",
    },
  ];

  const completedOrders = [
    {
      id: "#ORD-5001",
      amount: "₹12,500",
      date: "02 May 2026",
    },
    {
      id: "#ORD-5002",
      amount: "₹8,200",
      date: "18 Apr 2026",
    },
  ];

  const cancelledOrders = [
    {
      id: "#ORD-3021",
      amount: "₹4,000",
      date: "11 Mar 2026",
    },
  ];

  const requestedShipments = [
    {
      id: "#REQ-102",
      status: "Pending",
      date: "20 May 2026",
    },
  ];

  return (
    <>
      <Breadcrumb
        title="Customer Details"
        text="View customer complete information"
      />
     <div className="p-6 pt-5 space-y-6 relative z-0">

        {/* TOP PROFILE SECTION */}
       <Card className="overflow-hidden bg-gradient-to-r from-[#02374C] via-[#03506F] to-[#046C94] p-10 relative overflow-hidden rounded-[32px] shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3)] mb-15">
         <div className=" z-0">

            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col xl:flex-row gap-10 items-start xl:items-center">

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-40 h-40 rounded-[30px] border-[5px] border-white/30 object-cover shadow-2xl"
                />

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <Badge
                    className={`px-4 py-1 rounded-full text-sm ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </Badge>
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 w-full text-white">

                <InfoCard
                  icon={<User size={20} />}
                  label="Full Name"
                  value={customer.name}
                />

                <InfoCard
                  icon={<User size={20} />}
                  label="Last Name"
                  value={customer.lastName || "Murphy"}
                />

                <InfoCard
                  icon={<Mail size={20} />}
                  label="Email Address"
                  value={customer.email}
                />

                <InfoCard
                  icon={<Phone size={20} />}
                  label="Phone Number"
                  value={`+91 ${customer.phone}`}
                />

                <InfoCard
                  icon={<ShieldCheck size={20} />}
                  label="Customer ID"
                  value={`#${customer.id}`}
                />

                <InfoCard
                  icon={<MapPin size={20} />}
                  label="Country"
                  value="India"
                />

                <InfoCard
                  icon={<MapPin size={20} />}
                  label="Address Line 1"
                  value="Sector 62"
                />

                <InfoCard
                  icon={<MapPin size={20} />}
                  label="Address Line 2"
                  value="Noida Extension"
                />

                <InfoCard
                  icon={<MapPin size={20} />}
                  label="Pin Code"
                  value="201301"
                />

              </div>

            </div>

          </div>

        </Card>

        {/* TABS SECTION */}
        <Card className="border-0 shadow-2xl rounded-[32px] overflow-hidden">
          <CardContent className="p-8">

            <Tabs defaultValue="shipments" className="w-full">

              <TabsList className="w-full flex flex-wrap h-auto bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl gap-2">

                <TabsTrigger value="shipments" className="rounded-xl px-5 py-3">
                  Shipments
                </TabsTrigger>

                <TabsTrigger value="addresses" className="rounded-xl px-5 py-3">
                  Addresses
                </TabsTrigger>

                <TabsTrigger value="completed" className="rounded-xl px-5 py-3">
                  Completed Orders
                </TabsTrigger>

                <TabsTrigger value="cancelled" className="rounded-xl px-5 py-3">
                  Cancelled Orders
                </TabsTrigger>

                <TabsTrigger value="requested" className="rounded-xl px-5 py-3">
                  Requested Shipments
                </TabsTrigger>

              </TabsList>

              {/* SHIPMENTS */}
              <TabsContent value="shipments" className="mt-8">
                <DynamicList
                  icon={<Truck />}
                  title="Customer Shipments"
                  data={shipments}
                />
              </TabsContent>

              {/* ADDRESSES */}
              <TabsContent value="addresses" className="mt-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {addresses.map((address, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-lg rounded-3xl hover:shadow-2xl transition-all duration-300"
                    >
                      <CardContent className="p-6 space-y-3">

                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <MapPin className="text-primary" />
                          </div>

                          <div>
                            <h3 className="text-xl font-bold">
                              {address.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                              Saved Address
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-3">
                          <p>{address.address1}</p>
                          <p>{address.address2}</p>
                          <p>{address.country}</p>
                          <p>{address.pincode}</p>
                        </div>

                      </CardContent>
                    </Card>
                  ))}

                </div>

              </TabsContent>

              {/* COMPLETED */}
              <TabsContent value="completed" className="mt-8">
                <DynamicList
                  icon={<PackageCheck />}
                  title="Completed Orders"
                  data={completedOrders}
                />
              </TabsContent>

              {/* CANCELLED */}
              <TabsContent value="cancelled" className="mt-8">
                <DynamicList
                  icon={<PackageX />}
                  title="Cancelled Orders"
                  data={cancelledOrders}
                />
              </TabsContent>

              {/* REQUESTED */}
              <TabsContent value="requested" className="mt-8">
                <DynamicList
                  icon={<Clock3 />}
                  title="Requested Shipments"
                  data={requestedShipments}
                />
              </TabsContent>

            </Tabs>

          </CardContent>
        </Card>

      </div>
    </>
  );
};

export default CustomerDetails;

/* INFO CARD */
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-5 text-white hover:bg-white/20 transition-all duration-300">

      <div className="flex items-center gap-3 mb-3">

        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
          {icon}
        </div>

        <p className="text-sm text-white/70">
          {label}
        </p>

      </div>

      <p className="text-xl font-semibold break-words text-white">
        {value}
      </p>

    </div>
  );
};

/* DYNAMIC LIST */
const DynamicList = ({
  title,
  data,
  icon,
}: {
  title: string;
  data: any[];
  icon: React.ReactNode;
}) => {
  return (
    <div className="space-y-5">

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>

        <h2 className="text-2xl font-bold">
          {title}
        </h2>
      </div>

      <div className="space-y-4">

        {data.map((item, index) => (
          <Card
            key={index}
            className="border-0 shadow-md rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">

              <div>
                <h3 className="text-xl font-bold">
                  {item.id}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.date}
                </p>
              </div>

              <div className="flex items-center gap-4">

                {item.amount && (
                  <p className="text-lg font-semibold">
                    {item.amount}
                  </p>
                )}

                {item.status && (
                  <Badge className="px-4 py-2 rounded-full">
                    {item.status}
                  </Badge>
                )}

              </div>

            </CardContent>
          </Card>
        ))}

      </div>

    </div>
  );
};