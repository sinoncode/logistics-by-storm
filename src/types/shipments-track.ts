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