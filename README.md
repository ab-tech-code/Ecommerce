# Al-Bustan Garden E-commerce Platform

Welcome to the Al-Bustan e-commerce platform, a full-stack application designed for a garden and plant supply business. This platform allows customers to browse products, place orders, and engage with blog content. It also includes a comprehensive admin dashboard for managing the store's inventory, orders, and content.

## Features

- **Customer-Facing Store**: A clean, responsive interface for customers to browse and purchase products.
- **Product Catalog**: View products with detailed descriptions, pricing, and images.
- **Shopping Cart**: A persistent shopping cart for a seamless shopping experience.
- **Flexible Ordering**:
    - **Pay on Delivery (COD)**: Customers can choose to pay for their order upon delivery.
    - **Order via WhatsApp**: A direct link to pre-order a product via a pre-filled WhatsApp message.
- **Blog**: A section for articles and updates to engage with the community.
- **Admin Dashboard**: A secure, role-protected area for store administration.
    - **Product Management**: Add, update, and delete products from the store.
    - **Order Management**: View and manage all incoming customer orders.
    - **Blog Management**: Create and publish new articles.

## Tech Stack

- **Frontend**: React, React Router, Context API, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Setup and Installation

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### 2. Clone the Repository

```bash
git clone <your-repository-url>
cd al-bustan-ecommerce
```

### 3. Install Dependencies

Install dependencies for both the server and the client.

```bash
# Install server dependencies
npm install --prefix server

# Install client dependencies
npm install --prefix client
```

### 4. Set Up Environment Variables

You need to create a `.env` file inside the `server` directory. Copy the example file and fill in your own values.

```bash
cp server/.env.example server/.env
```

Your `server/.env` file should look like this:

```
# MongoDB Connection URI (replace with your own)
MONGODB_URI=mongodb://localhost:27017/al-bustan

# JWT Secret for token generation (choose a long, random string)
JWT_SECRET=your_super_secret_jwt_string

# Paystack keys are optional if you are not using Paystack payments
PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=

# URLs for development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
```

## Running the Application

### 1. Seed the Admin User

To create the default admin user, run the following command from the root directory:

```bash
npm run seed:admin --prefix server
```

This will create an admin account with the credentials listed below.

### 2. Start the Development Server

This command will start both the backend and frontend servers concurrently.

```bash
npm run dev
```

- The client will be running on `http://localhost:3000`.
- The server will be running on `http://localhost:5000`.

## Admin Dashboard

### Accessing the Dashboard

Navigate to `http://localhost:3000/admin/login` to access the admin login page.

### Admin Credentials

- **Username**: `Admin@Albustan`
- **Password**: `AdminPassword123!`

**Note**: It is highly recommended to change this password in a production environment.

### Recent Changes and How to Test Them

The following changes have been made to the application:

*   **Backend:**
    *   The `slug` and `sku` for new products are now automatically generated.
    *   A default category ("natural") is assigned to new products if no category is specified.
    *   The currency has been changed to Naira (NGN).
    *   An endpoint has been added for admins to view all orders.
    *   The stock is now decremented when an order is placed.
*   **Frontend:**
    *   The product creation form now includes a dropdown to select a category.
    *   The admin dashboard now has a page to view all orders.
    *   The checkout page now displays prices in Naira (NGN).

To test these changes, please follow these steps:

1.  **Create a new product:**
    *   Log in to the admin dashboard.
    *   Navigate to the "Manage Products" page.
    *   Fill out the form to create a new product. You should not see fields for `slug` and `sku`.
    *   Select a category from the dropdown menu.
    *   After creating the product, verify that it appears in the list of existing products.
2.  **Place an order:**
    *   Go to the storefront and add some products to your cart.
    *   Proceed to the checkout page.
    *   Verify that the prices are displayed in Naira (NGN).
    *   Fill out the shipping information and select "Cash on Delivery" as the payment method.
    *   Place the order.
3.  **Verify the order:**
    *   Log in to the admin dashboard.
    *   Navigate to the "Manage Orders" page.
    *   Verify that the order you just placed appears in the list of orders.
    *   Verify that the stock of the products you ordered has been decremented.

### Using the Dashboard

Once logged in, you will be redirected to the admin dashboard, where you can:
- **Manage Products**: Add new products with details like name, description, price, stock, and an image URL. You can also delete existing products.
- **Manage Orders**: View a list of all customer orders, including their status, items, and total price.
- **Manage Blog**: Create and publish new blog posts with a title, content, and an optional hero image.

## E-commerce Features

### Pay on Delivery

During the checkout process, users have the option to select "Pay on Delivery". Orders placed with this method will be marked as such in the admin dashboard, allowing you to process them accordingly.

### Order via WhatsApp

On each product's detail page, there is an "Order via WhatsApp" button.

- **How it works**: Clicking this button opens a new WhatsApp chat with a pre-filled message containing the product name and price.
- **Customization**: To make this feature work, you **must** update the placeholder WhatsApp number in the backend code.
    - **File**: `server/routes/products.js`
    - **Find the line**: `const yourWhatsAppNumber = 'YOUR_WHATSAPP_NUMBER_HERE';`
    - **Replace the placeholder** with your actual WhatsApp number in international format (e.g., `+2348123456789`).
