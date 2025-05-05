import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your actual API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

export function useExchangeRates(baseCurrency: string) {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}${baseCurrency}`);
      setRates(response.data.conversion_rates);
    } catch (err) {
      setError("Failed to fetch exchange rates");
      console.error("Error fetching exchange rates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [baseCurrency]);

  return { rates, loading, error };
}
