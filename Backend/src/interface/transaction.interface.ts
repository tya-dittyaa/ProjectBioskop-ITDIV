export interface PurchasedSeat {
  id: string;
  studioId: string;
  rowCharacter: string;
  columnNumber: number;
}

export interface Transaction {
  id: string;
  userId: string;
  paymentMethodId: string;
  date: string;
}

export interface TransactionDetail {
  id: string;
  transactionId: string;
  seatId: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
}
