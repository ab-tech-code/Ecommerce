const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * A helper function to handle API responses.
 * @param {Response} response - The raw response from the fetch call.
 * @returns {Promise<any>} - The JSON data from the response.
 * @throws {Error} - Throws an error if the response is not ok.
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    throw error;
  }
  return response.json();
};

/**
 * Fetches products from the API with optional query parameters.
 * @param {object} params - An object of query parameters (e.g., { category: 'natural', sort: '-price' }).
 * @returns {Promise<object>} - The API response containing products and pagination info.
 */
export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/products?${query}`;

  try {
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error; // Re-throw to be handled by the calling component
  }
};

/**
 * Fetches a single product by its slug.
 * @param {string} slug - The slug of the product to fetch.
 * @returns {Promise<object>} - The API response containing the product data.
 */
export const fetchProductBySlug = async (slug) => {
  const url = `${API_BASE_URL}/products/${slug}`;

  try {
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Creates a new order.
 * @param {object} orderData - The data for the new order.
 * @returns {Promise<object>} - The API response containing the created order.
 */
export const createOrder = async (orderData) => {
  const url = `${API_BASE_URL}/orders`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
};

/**
 * Initializes a Paystack transaction for a given order.
 * @param {string} orderId - The ID of the order to pay for.
 * @returns {Promise<object>} - The Paystack API response.
 */
export const initializePaystack = async (orderId) => {
    const url = `${API_BASE_URL}/payments/paystack/init`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Failed to initialize Paystack transaction:', error);
        throw error;
    }
};

// --- Auth Functions ---
export const login = async (credentials) => {
    const url = `${API_BASE_URL}/auth/login`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await handleResponse(response);
        return { data }; // To keep consistency with the AdminLoginPage
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};


// --- Admin Functions ---

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const getProducts = async () => {
    const url = `${API_BASE_URL}/products`;
    // This is a public route, but we use it in admin context too
    return fetch(url).then(handleResponse);
};

export const createProduct = async (productData) => {
    const url = `${API_BASE_URL}/products`;
    return fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    }).then(handleResponse);
};

export const deleteProduct = async (id) => {
    const url = `${API_BASE_URL}/products/${id}`;
    return fetch(url, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

export const getOrders = async () => {
    const url = `${API_BASE_URL}/admin/orders`;
    return fetch(url, { headers: getAuthHeaders() }).then(handleResponse);
};

export const createBlogPost = async (postData) => {
    const url = `${API_BASE_URL}/admin/blog`;
    return fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(postData),
    }).then(handleResponse);
};

/**
 * Fetches all published blog posts.
 * @returns {Promise<object>} - The API response containing the blog posts.
 */
export const fetchBlogPosts = async () => {
    const url = `${API_BASE_URL}/blog`;
    try {
        const response = await fetch(url);
        return handleResponse(response);
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        throw error;
    }
};

/**
 * Fetches a single blog post by its slug.
 * @param {string} slug - The slug of the blog post to fetch.
 * @returns {Promise<object>} - The API response containing the blog post.
 */
export const fetchBlogPostBySlug = async (slug) => {
    const url = `${API_BASE_URL}/blog/${slug}`;
    try {
        const response = await fetch(url);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch blog post with slug ${slug}:`, error);
        throw error;
    }
};
