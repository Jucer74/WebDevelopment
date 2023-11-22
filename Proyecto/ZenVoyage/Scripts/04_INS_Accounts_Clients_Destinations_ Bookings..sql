USE zenvoyagedb;

INSERT INTO `accounts` (`UserEmail`, `FirstName`, `LastName`, `Password`) VALUES
('karenperez2@example.com', 'Karen', 'Pérez', '1234567'),
('gomezalex856@example.com', 'Alex', 'Grazón', '1234567'),
('eric85el@example.com', 'Eric', 'Smith', '1234567');

INSERT INTO `clients` (`AccountId`, `Address`, `City`, `Country`, `PhoneNumber`, `Preferences`) VALUES
(1, 'Cra. 72 #13a-56', 'Cali', 'Colombia', '+57 321-856-4720', 'Playa, Aventura'),
(2, 'San Alberto 1300-1398', 'Córdoba', 'Argentina', '+54-9-11-1234-5678', 'Cultura, Gastronomía'),
(3, '1520-1506 6 St SW', 'Calgary', 'Canadá', '+1 123-456-7890', 'Montaña, Relax');

INSERT INTO `destinations` (`DestinationName`, `City`, `Country`, `Amount`, `Description`, `DestinationType`) VALUES
('Isla Barú', 'Cartagena', 'Colombia', 89.70, 'Barú se encuentran entre las atracciones más populares de Cartagena. En este tour, podrás disfrutar de este destino a tu propio ritmo.', 'Playa'),
('Tour de día completo en Machu Picchu', 'Urubamba', 'Perú', 384.47, 'Este tour te llevará a Machu Picchu, la ciudad perdida de los Incas y con fascinantes vistas de los Andes.', 'Cultural'),
('City tour Hop on Hop off Madrid', 'Madrid', 'España', 1500.75, 'Explora cómodamente la ciudad a bordo de un autobús turístico de 2 pisos. Descubre la ciudad al detalle con un mismo ticket.', 'Ciudad');

INSERT INTO `bookings` (`ClientId`, `DestinationId`, `BookingDate`, `TotalAmount`) VALUES
(1, 3, '2024-01-15', 1800.50),
(2, 1, '2024-02-20', 96.70),
(3, 2, '2024-03-10', 450.47);