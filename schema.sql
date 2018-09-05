
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
  item_id INT(11)
  AUTO_INCREMENT NOT NULL,
product_name VARCHAR
  (100) NOT NULL,
department_name VARCHAR
  (100) NOT NULL,
price DECIMAL
  (10,2)NOT NULL,
stock_quantity INT
  (11) NOT NULL,
PRIMARY KEY
  (item_id)
);

  INSERT INTO products
    (product_name,department_name,price,stock_quantity)
  VALUES('PS4', 'Console', 499.99, 500),
    ('Xbox One X', 'Console', 599.99, 500),
    ('Switch', 'Console', 369.99, 500),
    ('2DS XL', 'Console', 169.99, 500),
    ('PS4 DualShock 4 Controller', 'Controllers', 74.99, 500),
    ('Xbox One Controller', 'Controllers', 64.99, 500),
    ('Dead Island 2', 'PS4 Games', 74.99, 100),
    ('Sekiro:Shadows Die Twice', 'PS4 Games', 79.99, 100),
    ('Resident Evil 2', 'PS4 Games', 79.99, 100),
    ('Dead or Alive 6', 'PS4 Games', 69.99, 100),
    ('Gear 5', 'Xbox one Games', 79.99, 10),
    ('Call of Duty WWII', 'Xbox one Games', 49.99, 23),
    ('Fallout 4', 'Xbox one Games', 29.99, 37);