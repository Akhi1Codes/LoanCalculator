// Home.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { calculateLoan } from "../hooks/useLoanCalculator";

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
};

const supportedCurrencies = Object.keys(currencySymbols);

export default function Home() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [showResults, setShowResults] = useState(false);

  const { schedule, monthlyPayment } = calculateLoan(
    parseFloat(loanAmount),
    parseFloat(interestRate),
    parseInt(term)
  );

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.conversion_rates) {
          setExchangeRates(data.conversion_rates);
        }
      });
  }, []);

  const handleCalculate = () => {
    if (!loanAmount || !interestRate || !term) return;
    setShowResults(true);
  };

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTerm("");
    setShowResults(false);
  };

  const conversionRate = exchangeRates[selectedCurrency] || 1;
  const currencySymbol = currencySymbols[selectedCurrency] || "$";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        width: 1,
        mt: 8,
      }}
    >
      <Box sx={{ width: { xs: 1, sm: 1 / 2, md: 1 / 3 } }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Loan Calculator
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            fullWidth
          />
          <TextField
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            fullWidth
          />
          <TextField
            label="Term (Years)"
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            fullWidth
          />

          <Button variant="contained" onClick={handleCalculate}>
            Calculate
          </Button>

          {showResults && (
            <>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography>Select Currency:</Typography>
                <Select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  {supportedCurrencies.map((cur) => (
                    <MenuItem key={cur} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Typography variant="h6" textAlign="center">
                Monthly Payment: {currencySymbol}
                {(monthlyPayment * conversionRate).toFixed(2)}
              </Typography>

              <Box mt={3}>
                <Typography variant="h6">Amortization Schedule</Typography>
                <Box component="table" sx={{ width: "100%", mt: 1 }}>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Principal</th>
                      <th>Interest</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((entry) => (
                      <tr key={entry.month}>
                        <td>{entry.month}</td>
                        <td>
                          {currencySymbol}
                          {(entry.principal * conversionRate).toFixed(2)}
                        </td>
                        <td>
                          {currencySymbol}
                          {(entry.interest * conversionRate).toFixed(2)}
                        </td>
                        <td>
                          {currencySymbol}
                          {(entry.balance * conversionRate).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
                sx={{ mt: 2 }}
              >
                Reset
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
