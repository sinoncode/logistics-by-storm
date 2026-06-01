export interface ShipmentRequest {
  id: number;
  tracking_number: string;
  customer_name: string;
  warehouse_name: string;
  status: string;
  created_at: string;
}