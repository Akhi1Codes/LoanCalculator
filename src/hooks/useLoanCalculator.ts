export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export function useLoanCalculator() {
  const calculateLoan = (
    principal: number,
    annualRate: number,
    years: number
  ) => {
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const amortizationSchedule: AmortizationEntry[] = [];
    let balance = principal;

    for (let month = 1; month <= totalPayments; month++) {
      const interest = balance * monthlyRate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;

      amortizationSchedule.push({
        month,
        principal: principalPayment,
        interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    return { monthlyPayment, amortizationSchedule };
  };

  return { calculateLoan };
}
