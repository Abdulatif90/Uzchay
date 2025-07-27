export enum OrderStatus {
    PUASE = "PAUSE",
    PROCESS = "PROCESS",
    FINISH = "FINISH",
    DELETE = "DELETE",
  }
export enum OrderType {
    PRODUCT = "PRODUCT",
    SERVICE = "SERVICE",
  }
export enum OrderPaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    REFUNDED = "REFUNDED",
    CANCELLED = "CANCELLED",
  }
export enum OrderPaymentMethod {
    CASH = "CASH",
    CREDIT_CARD = "CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
  }
export enum OrderDeliveryStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    RETURNED = "RETURNED",
    CANCELLED = "CANCELLED",
    }