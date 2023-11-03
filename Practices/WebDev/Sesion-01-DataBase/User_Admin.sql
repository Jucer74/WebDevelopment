USE [master]
GO

/* For security reasons the login is created disabled and with a random password. */
/****** Object:  Login [Admin]    Script Date: 10/24/2020 12:52:40 AM ******/
CREATE LOGIN [Admin] WITH PASSWORD=N'pupJo81z7Lzex+5udPruQ6TxsyLyMGY7r7Lz7w20ci8=', DEFAULT_DATABASE=[UsersDB], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

ALTER LOGIN [Admin] DISABLE
GO

