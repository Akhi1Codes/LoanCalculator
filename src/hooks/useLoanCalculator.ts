// hooks/calculateLoan.ts
export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export const calculateLoan = (
  principal: number,
  rate: number,
  years: number
): { monthlyPayment: number; schedule: AmortizationEntry[] } => {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const schedule: AmortizationEntry[] = [];
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    balance -= principalPayment;

    schedule.push({
      month,
      principal: principalPayment,
      interest,
      balance: balance > 0 ? balance : 0,
    });
  }

  return { monthlyPayment, schedule };
};
