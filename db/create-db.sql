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
	Created_By INT FOREIGN KEY REFERENCES person(Id),
	PRIMARY KEY (Id)
);
GO

CREATE TABLE product (
	Id INT NOT NULL IDENTITY,
	Name TEXT NOT NULL,
	Description TEXT NOT NULL,
	Price DECIMAL Not NULL,
	Category_Id INT FOREIGN KEY REFERENCES category(Id),
	Created_By INT FOREIGN KEY REFERENCES person(Id),
	Created_at DATETIME NOT NULL,
	IsArchived BIT, 
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
('household devices1', 'all things related to household devices', 1),
('household devices2', 'all things related to household devices', 1),
('household devices3', 'all things related to household devices', 1),
('household devices4', 'all things related to household devices', 1),
('household devices5', 'all things related to household devices', 1)
GO

INSERT INTO [product] (Name, Description, Price, Category_Id, Created_By, Created_at, IsArchived)
VALUES 
('Air Conditioner', 'A high quality Air conditioner', 1499.9, 1, 1, "2021-05-02T22:10:10", 0),
('Fan', 'high quality fan', 149.99, 1,1, "2021-05-02T22:10:10", 0),
('Book', 'high quality book', 19.99, 1,1, "2021-05-02T22:10:10", 1) 
GO