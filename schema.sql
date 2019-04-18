
-- 1. Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

-- 2. Then create a Table inside of that database called `products`.

-- 3. The products table should have each of the following columns:

  --  * item_id (unique id for each product)
-- 
  --  * product_name (Name of product)

  --  * department_name

  --  * price (cost to customer)

  --  * stock_quantity (how much of the product is available in stores)
USE bamazon;
CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Far Cry New Dawn - Standard Edition - PS4','Video Games', 6.99,12);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Marvels Spider Man - PS4','Video Games',8.99, 4);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Red Dead Redemption 2 - PS4','Video Games',9.99, 6);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Yahtzee','Board Games',7.99,20);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Jenga Classic Game','Board Games',6.99, 6);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Sorry! Game','Board Games',6.99,23);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Travel Scavenger Hunt Card Game','Travel Games',7.43,15);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('QuadPro Magnetic Travel Chess','Travel Games',14.85,8);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Regal Games Original Travel Bingo 4 Packs','Travel Games',7.99,10);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('Connect 4 Grab and Go Games - Travel Size','Travel Games',4.97,15);

