import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Alert,
} from "@mui/material";
import { useExchangeRates } from "../hooks/useExchangeRates";

export default function ExchangeRates() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const { rates, loading, error } = useExchangeRates(baseCurrency);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Live Exchange Rates
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          label="Base Currency"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
          inputProps={{ maxLength: 3 }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(rates).map(([currency, rate]) => (
                <TableRow key={currency}>
                  <TableCell>{currency}</TableCell>
                  <TableCell align="right">{rate.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
