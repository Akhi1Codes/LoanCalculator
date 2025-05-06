import type { FC } from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

interface ErrorPageProps {
  code?: number;
  message?: string;
}

const ErrorPage: FC<ErrorPageProps> = ({
  code = 404,
  message = "Page not found",
}) => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ErrorIcon sx={{ fontSize: 80, color: "red", marginBottom: 2 }} />
      <Typography variant="h4" gutterBottom>
        {code} - {message}
      </Typography>
      <Typography variant="body1">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ padding: "10px 20px" }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
