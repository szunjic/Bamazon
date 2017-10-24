CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT NOT NULL,
	
	PRIMARY KEY (item_id)
);

SELECT * FROM products

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('ice cream', 'grocery', 3.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('dog food', 'pet care', 25.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('cute stickers', 'office supply', 5.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('benadryll', 'pharmacy', 9.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('face mask', 'personal care', 3.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('scented candle', 'household ', 9.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('blanket', 'household', 15.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('soccer ball', 'sports & outdoors', 10.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('camping tent', 'sports & outdoors', 80.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('running sneakers', 'shoes', 25.50, 10);

SELECT * FROM products


