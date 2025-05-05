import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  useLoanCalculator,
  type AmortizationEntry,
} from "../hooks/useLoanCalculator";

export default function Home() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<AmortizationEntry[] | null>(null);

  const { calculateLoan } = useLoanCalculator();

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const years = parseInt(term);

    if (!principal || !rate || !years) return;

    const { monthlyPayment, amortizationSchedule } = calculateLoan(
      principal,
      rate,
      years
    );

    setResult(monthlyPayment);
    setSchedule(amortizationSchedule);
  };

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTerm("");
    setResult(null);
    setSchedule(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        width: 1,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "75%",
            md: "50%",
            lg: "33.33%",
          },
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Loan Calculator
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          }}
        >
          <TextField
            label="Loan Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
          <TextField
            label="Interest Rate (%)"
            variant="outlined"
            fullWidth
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          <TextField
            label="Term (Years)"
            variant="outlined"
            fullWidth
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleCalculate}>
              Calculate
            </Button>

            {result !== null && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </Box>

          {result !== null && (
            <Typography variant="h6" textAlign="center" mt={2}>
              Monthly Payment: ${result.toFixed(2)}
            </Typography>
          )}
        </Box>

        {schedule && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Amortization Schedule
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Principal</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell>Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.map((entry) => (
                    <TableRow key={entry.month}>
                      <TableCell>{entry.month}</TableCell>
                      <TableCell>${entry.principal.toFixed(2)}</TableCell>
                      <TableCell>${entry.interest.toFixed(2)}</TableCell>
                      <TableCell>${entry.balance.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
}
