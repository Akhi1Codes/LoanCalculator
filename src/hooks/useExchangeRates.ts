import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

export function useExchangeRates(baseCurrency: string) {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!baseCurrency) return;
    const controller = new AbortController();
    const delay = 500;
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}${baseCurrency}`, {
          signal: controller.signal,
        });

        if (response.data.result !== "success") {
          throw new Error(response.data["error-type"] || "API error");
        }

        setRates(response.data.conversion_rates);
      } catch (err: unknown) {
        setError("Failed to fetch exchange rates");
        console.error("Exchange rate fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [baseCurrency]);

  return { rates, loading, error };
}
