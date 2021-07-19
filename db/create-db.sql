DROP DATABASE IF EXISTS product
GO

CREATE DATABASE [product]
GO

USE [product];
GO


CREATE TABLE person (
	Id INT NOT NULL IDENTITY,
  Username VARCHAR(40) UNIQUE NOT NULL,
  Password TEXT NOT NULL,
	Name TEXT NOT NULL,
	Role TEXT NOT NULL,
	PRIMARY KEY (Id)
);
GO

CREATE TABLE category (
	Id INT NOT NULL IDENTITY,
	Name TEXT NOT NULL,
	Description TEXT NOT NULL,
	Created_By INT NOT NULL FOREIGN KEY REFERENCES person(Id),
	PRIMARY KEY (Id)
);
GO

CREATE TABLE product (
	Id INT NOT NULL IDENTITY,
	Name TEXT NOT NULL,
	Description TEXT NOT NULL,
	Price MONEY Not NULL,
	Category_Id INT NOT NULL FOREIGN KEY REFERENCES category(Id),
	Created_By INT NOT NULL FOREIGN KEY REFERENCES person(Id),
	Created_at DATETIME NOT NULL,
	IsArchived BIT NOT NULL, 
	PRIMARY KEY (Id)
);
GO

INSERT INTO [person] (Username, Password, Name, Role)
VALUES 
('admin','admin', 'admin', 'admin'),
('manager', 'manager', 'manager', 'manager'),
('customer', 'customer', 'customer', 'customer')
GO

INSERT INTO [category] (Name, Description, Created_By)
VALUES
('reading', 'all things related to reading', 1),
('household devices', 'all things related to household devices', 1),
('category 1', 'description of category 1', 1),
('category 2', 'description of category 2', 1),
('category 3', 'description of category 3', 1),
('category 4', 'description of category 4', 1)
GO

INSERT INTO [product] (Name, Description, Price, Category_Id, Created_By, Created_at, IsArchived)
VALUES 
('Air Conditioner', 'A high quality Air conditioner', 1499.9, 1, 1, "2021-01-02T22:10:10", 0),
('Fan', 'high quality fan', 149.99, 1,1, "2021-02-02T22:10:10", 0),
('Fan1', 'high quality fan', 149.99, 3,1, "2021-03-02T22:10:10", 0),
('Fan2', 'high quality fan', 149.99, 3,1, "2021-04-02T22:10:10", 0),
('Fan3', 'high quality fan', 149.99, 3,1, "2021-05-02T22:10:10", 0),
('Fan4', 'high quality fan', 149.99, 3,1, "2021-06-02T22:10:10", 0),
('Book', 'high quality book', 19.99, 1,1, "2021-07-02T22:10:10", 1) 
GO