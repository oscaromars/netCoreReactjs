IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MisFormas')
BEGIN
    CREATE DATABASE MisFormas;
END;
GO

USE MisFormas;
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Cabeceras')
BEGIN
    CREATE TABLE Cabeceras (
        Id INT PRIMARY KEY IDENTITY(1,1),
        NombreTabla NVARCHAR(100) NOT NULL,
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FechaModificacion DATETIME DEFAULT GETDATE(),
        Estado BIT NOT NULL, 
        CONSTRAINT CK_Cabeceras_Estado CHECK (Estado IN (0, 1))  
    );
END;
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Detalles')
BEGIN
    CREATE TABLE Detalles (
        Id INT PRIMARY KEY IDENTITY(1,1),
        CabeceraId INT NOT NULL,
        CampoDetalle NVARCHAR(255) NOT NULL,
        CampoValor NVARCHAR(255) NULL,
        Estado BIT NOT NULL DEFAULT 1,  
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FechaModificacion DATETIME DEFAULT GETDATE(),
        CONSTRAINT FK_Detalles_Cabeceras FOREIGN KEY (CabeceraId) 
            REFERENCES Cabeceras(Id) ON DELETE CASCADE,
        CONSTRAINT CK_Detalles_Estado CHECK (Estado IN (0, 1))  
    );
END;
GO

INSERT INTO Cabeceras (NombreTabla, Estado)
VALUES 
    ('Personas', 1),  
    ('Mascotas', 1);  
		
INSERT INTO Detalles (CabeceraId, CampoDetalle, CampoValor, Estado)
VALUES 
    (1, 'Nombres', 'text', 1),  
    (1, 'Fecha de Nacimiento', 'date', 1),
	(1, 'Estatura', 'number', 1),
	(2, 'Nombre', 'text', 1),  
    (2, 'Especie', 'text', 1), 
	(2, 'Raza', 'text', 1), 
	(2, 'Color', 'text', 1); 

