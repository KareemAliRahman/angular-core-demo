DROP DATABASE IF EXISTS product;

CREATE DATABASE product;

\c product

CREATE TABLE "person" (
	Id INT GENERATED ALWAYS AS IDENTITY,
  	Username VARCHAR(40) UNIQUE NOT NULL,
  	Password VARCHAR(40) NOT NULL,
	Name VARCHAR(40) NOT NULL,
	Role VARCHAR(40) NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE "category" (
	Id INT GENERATED ALWAYS AS IDENTITY,
	Name VARCHAR(40) NOT NULL,
	Description VARCHAR(200) NOT NULL,
	Created_By INT NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT fk_category_person
		FOREIGN KEY(Created_By)
			REFERENCES person(Id)
);

CREATE TABLE "product" (
	Id INT GENERATED ALWAYS AS IDENTITY,
	Name VARCHAR(40) NOT NULL,
	Description VARCHAR(200) NOT NULL,
	Price MONEY Not NULL,
	Category_Id INT NOT NULL, 
	Created_By INT NOT NULL, 
	Created_at TIMESTAMP NOT NULL,
	IsArchived BOOLEAN NOT NULL, 
	PRIMARY KEY (Id),
	CONSTRAINT fk_product_person
		FOREIGN KEY(Created_By)
			REFERENCES person(Id),
	CONSTRAINT fk_product_category
		FOREIGN KEY(Category_Id)
			REFERENCES category(Id)
);

INSERT INTO person (Username, Password, Name, Role)
VALUES 
('admin','admin', 'admin', 'admin'),
('manager', 'manager', 'manager', 'manager'),
('customer', 'customer', 'customer', 'customer');

INSERT INTO category (Name, Description, Created_By)
VALUES
('reading', 'all things related to reading', 1),
('household devices', 'all things related to household devices', 1),
('category 1', 'description of category 1', 1),
('category 2', 'description of category 2', 1),
('category 3', 'description of category 3', 1),
('category 4', 'description of category 4', 1);

INSERT INTO product (Name, Description, Price, Category_Id, Created_By, Created_at, IsArchived)
VALUES 
('Air Conditioner', 'A high quality Air conditioner', 1499.9, 1, 1, '2021-01-02'::timestamp, FALSE),
('Fan', 'high quality fan', 149.99, 1,1, '2021-02-02'::timestamp, FALSE),
('Fan1', 'high quality fan', 149.99, 3,1, '2021-03-02'::timestamp, FALSE),
('Fan2', 'high quality fan', 149.99, 3,1, '2021-04-02'::timestamp, FALSE),
('Fan3', 'high quality fan', 149.99, 3,1, '2021-05-02'::timestamp, FALSE),
('Fan4', 'high quality fan', 149.99, 3,1, '2021-06-02'::timestamp, FALSE),
('Book', 'high quality book', 19.99, 1,1, '2021-07-02'::timestamp, TRUE);
