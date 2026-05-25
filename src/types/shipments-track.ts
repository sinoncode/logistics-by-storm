// ======================================================
// USER
// ======================================================

export interface ShipmentUser {
  id: string;
  name: string;
  email: string;
}

// ======================================================
// COUNTRY
// ======================================================

export interface ShipmentCountry {
  id: number;
  name: string;
  code: string | null;
}

// ======================================================
// FACILITY
// ======================================================

export interface ShipmentFacility {
  id: number;
  name: string;
}

// ======================================================
// SHIPMENT
// ======================================================

export interface Shipment {
  id: number;

  shipment_request_id: number;

  user_id: string;

  tracking_number: string;

  delivery_type: string;

  current_status: string;

  created_at: string;

  updated_at: string;

  user: ShipmentUser;

  origin_country: ShipmentCountry;

  destination_country: ShipmentCountry;

  origin_facility: ShipmentFacility;

  destination_facility: ShipmentFacility;
}

// ======================================================
// API RESPONSE
// ======================================================

export interface ShipmentListResponse {
  success: boolean;

  message: string;

  data: Shipment[];

  meta: {
    current_page: number;

    last_page: number;

    per_page: number;

    total: number;
  };
}

export interface TrackingLog {
  id: number;
  status: string;
  description: string | null;
  created_at: string;
}

export interface ShipmentDetails {
  id: number;
  tracking_number: string;
  current_status: string;
  delivery_type: string;

  origin_country: {
    name: string;
  };

  destination_country: {
    name: string;
  };

  origin_facility: {
    name: string;
  };

  destination_facility: {
    name: string;
  };

  user: {
    name: string;
    email: string;
  };

  delivery_address: {
    address_line_1: string;
  };

  tracking_logs: TrackingLog[];

  created_at: string;
}


// ======================================================
// TRACKING STATUS
// ======================================================

export type ShipmentTrackingStatus =
  | "pending"
  | "received_at_origin"
  | "dispatched"
  | "in_transit"
  | "arrived_at_destination"
  | "out_for_delivery"
  | "delivered"
  | "exception"
  | "cancelled"
  | "returned";

// ======================================================
// USER
// ======================================================

export interface ShipmentUser {
  id: string;
  name: string;
  email: string;
}

export interface ShipmentFacility {
  id: string;
  name: string;
}

export interface ShipmentCountry {
  id: string;
  name: string;
}

export interface ShipmentDetails {
  id: string;

  tracking_number: string;

  current_status: string;

  created_at: string;

  delivery_type: string;

  user: ShipmentUser;

  origin_facility: ShipmentFacility;

  destination_facility: ShipmentFacility;

  origin_country: ShipmentCountry;

  destination_country: ShipmentCountry;
}