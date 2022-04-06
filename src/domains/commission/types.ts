export interface CommissionConfig {
    defaultPercentage: {
        percentage: number
        minimumAllowedComissionInEur: number;
    };
    transactionTurnoverDiscount: {
        monthlyAmountEurThreshold: number;
    }
}