## Live Link

## Project Documentation

This document outlines the key features, technologies used, and setup instructions for this project.

### 1\. Overview

This project is a Loan EMI Calculator with Currency Conversion". It allows users to calculate Equated Monthly Installments (EMIs) for loans and view the EMI amount in different currencies. The application aims to be user-friendly, responsive, and provides a seamless experience across various devices.

### 2\. Key Features

- **EMI Calculation:** Utilizes a provided formula to calculate the EMI based on principal loan amount, interest rate, and loan tenure.
- **Global State Management:** Employs the Context API for managing global application state, such as the selected theme (light/dark) and currency.
- **Reusable Logic:** Implements custom React Hooks to encapsulate reusable functionalities like EMI calculation and fetching exchange rates.
- **Live Currency Conversion:** Integrates with the ExchangeRate API to fetch real-time exchange rates and display EMI amounts in different currencies.
- **Responsive Design:** The application is designed to be fully responsive and adapt seamlessly to different screen sizes.
- **Theme Management:** Implements both light and dark modes using Material UI's theming system, allowing users to customize the visual appearance.
- **Error Handling:** Includes a custom "404 Not Found" page for invalid routes and a dedicated "Error Page" to gracefully handle runtime errors.

### 3\. Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Material UI:** A popular React UI framework providing pre-built components and styling.
- **Context API:** React's built-in solution for global state management.
- **Custom React Hooks:** For encapsulating reusable logic.
- **ExchangeRate API:** An external API used for fetching real-time currency exchange rates.
- **React Router:** A popular React routing library.

### 4\. Setup Instructions

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Akhi1Codes/LoanCalculator
    cd LoanCalculator
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

    _(Ensure you have Node.js and npm or yarn installed on your system.)_

3.  **Environment Variables:**

    - Create a `.env` file in the root of the project.
    - Add your ExchangeRate API key (if required) to the `.env` file:
      ```
      REACT_APP_EXCHANGE_RATE_API_KEY=YOUR_API_KEY
      ```
      _(Refer to the ExchangeRate API documentation for instructions on obtaining an API key.)_

4.  **Start the development server:**

    ```bash
    npm start  # or yarn start
    ```

    This will start the application in development mode. Open your browser and navigate to [https://www.google.com/search?q=http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or the port specified in your terminal).

### 5\. Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── context/
│   ├── layouts/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
├── .gitignore
├── README.md
├── package.json
└── ... (other configuration files)
```

- `public/`: Contains static assets served by the application.
- `src/components/`: Houses reusable UI components.
- `src/hooks/`: Contains custom React Hooks for reusable logic.
- `src/pages/`: Contains the main pages/views of the application.
- `src/context/`: Contains the Context API setup for global state management.
- `src/App.js`: The root component of the application.
- `src/index.js`: The entry point of the application.
- `src/utils`: Contains Utility functions for the application.
- `.env`: Stores environment-specific variables (e.g., API keys).
- `.gitignore`: Specifies files and directories that should be ignored by Git.
- `README.md`: The main documentation file for the project.
- `package.json`: Contains project metadata and dependencies.
