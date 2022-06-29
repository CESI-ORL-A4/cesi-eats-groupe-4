ALTER DATABASE USER_DB SET AUTO_CLOSE OFF;

IF OBJECT_ID('dbo.Users', 'U') IS NULL
    CREATE TABLE Users (
      Id INT NOT NULL AUTO_INCREMENT,
      FirstName VARCHAR(45) NOT NULL,
      LastName VARCHAR(45) NOT NULL,
      Email VARCHAR(45) NOT NULL,
      BirthDate DATE NOT NULL,
      Address VARCHAR(255) NOT NULL,
      Sponsorship DATE,
      Role VARCHAR(255),
      PRIMARY KEY (Id)
    );
GO
