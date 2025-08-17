# Garden E-commerce Website

This is a full-stack e-commerce website for a garden company.

## Tech Stack

- **Frontend:** React, React Router, Context API
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Payments:** Paystack, Cash on Delivery

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd garden-ecommerce
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the `server` directory.
    - Copy the contents of `.env.example` to the new `.env` file and fill in the required values.

4.  **Seed the database (optional):**
    ```bash
    npm run seed --prefix server
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```

    This will start both the client and server concurrently.
    - Client: `http://localhost:3000`
    - Server: `http://localhost:5000`
