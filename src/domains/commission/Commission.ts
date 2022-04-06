export class Commission {
    public readonly amount: number;
    public readonly currency: string;

    constructor({ amount, currency }: {
        amount: number;
        currency: string;
    }) {
        this.amount = amount;
        this.currency = currency;
    }
}