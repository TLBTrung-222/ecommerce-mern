-- Use these command to initialize your database

-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pw_hash VARCHAR(255) NOT NULL,
    pw_salt VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    phone BIGINT,
    address VARCHAR(255),
    avatar VARCHAR(255),
    city VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    image VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    count_in_stock INTEGER NOT NULL,
    rating DECIMAL(3, 2) NOT NULL,
    description TEXT,
    discount DECIMAL(5, 2),
    selled INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    payment_method VARCHAR(255) NOT NULL,
    items_price DECIMAL(10, 2) NOT NULL,
    shipping_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    is_paid BOOLEAN DEFAULT false,
    paid_at TIMESTAMP,
    is_delivered BOOLEAN DEFAULT false,
    delivered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    name VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2)
);

-- Create Shipping Addresses Table
CREATE TABLE shipping_addresses (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    phone BIGINT NOT NULL
);

-- Sample Data Insertion for Users Table
INSERT INTO users (name, email, pw_hash, pw_salt, is_admin, phone, address, avatar, city) VALUES 
('Alice Smith', 'alice@example.com', 'hashed_password_1', 'salt_1', false, 1234567890, '123 Main St', 'avatar1.png', 'New York'),
('Bob Johnson', 'bob@example.com', 'hashed_password_2', 'salt_2', true, 9876543210, '456 Elm St', 'avatar2.png', 'San Francisco');

-- Sample Data Insertion for Products Table
INSERT INTO products (name, image, type, price, count_in_stock, rating, description, discount, selled) VALUES 
('Product 1', 'image1.png', 'Electronics', 199.99, 10, 4.5, 'A great electronic product', 10.00, 5),
('Product 2', 'image2.png', 'Clothing', 29.99, 50, 4.0, 'A stylish clothing item', 5.00, 20);

-- Sample Data Insertion for Orders Table
INSERT INTO orders (user_id, payment_method, items_price, shipping_price, total_price, is_paid, paid_at, is_delivered, delivered_at) VALUES 
(1, 'Credit Card', 229.98, 5.00, 234.98, true, '2024-08-23 10:00:00', false, NULL),
(2, 'PayPal', 29.99, 5.00, 34.99, false, NULL, false, NULL);

-- Sample Data Insertion for Order Items Table
INSERT INTO order_items (order_id, product_id, name, amount, image, price, discount) VALUES 
(1, 1, 'Product 1', 1, 'image1.png', 199.99, 10.00),
(2, 2, 'Product 2', 1, 'image2.png', 29.99, 5.00);

-- Sample Data Insertion for Shipping Addresses Table
INSERT INTO shipping_addresses (order_id, full_name, address, city, phone) VALUES 
(1, 'Alice Smith', '123 Main St', 'New York', 1234567890),
(2, 'Bob Johnson', '456 Elm St', 'San Francisco', 9876543210);
