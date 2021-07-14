DROP DATABASE IF EXISTS product
GO

CREATE DATABASE [product]
GO

USE [product];
GO

CREATE TABLE category (
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	Name TEXT NOT NULL,
	Description TEXT NOT NULL,
);
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

CREATE TABLE product (
	Id INT PRIMARY KEY NOT NULL IDENTITY,
	Name TEXT NOT NULL,
	Description TEXT NOT NULL,
    Price DECIMAL Not NULL,
    Category_Id INT FOREIGN KEY REFERENCES category(Id),
    Created_By INT FOREIGN KEY REFERENCES person(Id)
);
GO


INSERT INTO [category] (Name, Description)
VALUES
('reading', 'all things related to reading'),
('household devices', 'all things related to household devices')
GO


INSERT INTO [person] (Username, Password, Name, Role)
VALUES 
('admin','admin', 'admin', 'admin'),
('manager', 'manager', 'manager', 'manager'),
('customer', 'customer', 'customer', 'customer')
GO


INSERT INTO [product] (Name, Description, Price, Category_Id, Created_By)
VALUES 
('Air Conditioner', 'A high quality Air conditioner', 1499.9, 1, 1),
('Fan', 'high quality fan', 149.99, 1,1),
('Book', 'high quality book', 19.99, 1,1) 
GO