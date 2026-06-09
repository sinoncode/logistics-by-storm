import {
  House,
  Settings,
  Truck,
  ClipboardList,

  Users,
  Search,
  PackageX,

  ShieldCheck,
  CreditCard,
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House,
      isActive: true,
      items: [
       
      ],
    },

     {
      label: "Package",
      permission: [
        "shipment_packages.create",
"shipment_packages.update",
"shipment_packages.view"
      ],
    },
    {
      title: "Search Package",
      url: "/search-package",
      icon: Search,
      isActive: true,
      permission: [
        "shipment_packages.create",
"shipment_packages.update",
"shipment_packages.view"
      ],
      items: [
      ],
    },
    {
      title: "Unregistered Package",
      url: "/unregistered-package",
      icon: PackageX,
      isActive: true,
      items: [
      ],
    },


 {
      label: "Shipments",
       permissions: [
        "shipment_requests.view",
    "shipment_requests.create",
    "shipment_requests.update",
    "shipment_requests.review",
    "shipment_requests.receive",
    "shipment_requests.cancel",
     "shipments.view",
    "shipments.create",
    "shipments.update_status",
    "shipments.cancel",
       ]
    },
   {
  title: "Shipment Requests",
  url: "/shipment-request",
  icon: ClipboardList,
  isActive: true,

  permissions: [
    "shipment_requests.view",
    "shipment_requests.create",
    "shipment_requests.update",
    "shipment_requests.review",
    "shipment_requests.receive",
    "shipment_requests.cancel",
  ],

  items: []
},
   {
  title: "Shipments",
  url: "/shipments",
  icon: Truck,
  isActive: true,

  permissions: [
    "shipments.view",
    "shipments.create",
    "shipments.update_status",
    "shipments.cancel",
  ],

  items: []
},


   

    {
      label: "Customer",
      permissions: [
    "customers.view",
    "customers.create",
    "customers.update",
    "customers.delete",
  ],
    },


    {
  title: "Customers",
  url: "/customers-list",
  icon: Users,
  isActive: true,

  permissions: [
    "customers.view",
    "customers.create",
    "customers.update",
    "customers.delete",
  ],

  items: []
},
    {
      label: "Teams",
      permissions: [
    "teams.view",
    "teams.create",
    "teams.update",
    "teams.delete",
    "permission.view",
  ],
    },
    {
      title: "Teams",
      url: "/teams-list",
      icon: ShieldCheck,
      isActive: true,
       permissions: [
    "teams.view",
    "teams.create",
    "teams.update",
    "teams.delete",
    "permission.view",
  ],
      items: [
        {
          title: "Team",
          url: "/teams-list",
          
          circleColor: "bg-primary",
        },
        {
          title: "Permissions",
          url: "/teams-permissions",
          circleColor: "bg-yellow-500",
        },
        // {
        //   title: "View Profile",
        //   url: "/view-profile",
        //   circleColor: "bg-red-600",
        // },
      ],
    },
   
     {
      label: "Payments",
       permissions: [
    "payments.view",
    "payments.initiate",
    "payments.verify",
    "payments.refund",
  ],
    },
   {
  title: "Payments",
  url: "/payment-lists",
  icon: CreditCard,
  isActive: true,

  permissions: [
    "payments.view",
    "payments.initiate",
    "payments.verify",
    "payments.refund",
  ],

  items: []
},
    
    {
      label: "Setting",
    },
   
    {
      title: "Setting",
      url: "/company",
      icon: Settings,
      isActive: true,
      // items: [
      //   {
      //     title: "Company",
      //     url: "/company",
      //     circleColor: "bg-primary",
      //   },
      //   {
      //     title: "Notification",
      //     url: "/settings-notification",
      //     circleColor: "bg-yellow-500",
      //   },
      //   {
      //     title: "Notification Alert",
      //     url: "/notification-alert",
      //     circleColor: "bg-yellow-500",
      //   },
      // ],
    },
  ],
};
