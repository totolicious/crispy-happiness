export interface CommissionConfig {
  defaultPercentage: {
    percentage: number;
    minimumAllowedCommissionInEur: number;
  };
  transactionTurnoverDiscount: {
    monthlyAmountEurThreshold: number;
    commissionInEurAfterThreshold: number;
  };
}
