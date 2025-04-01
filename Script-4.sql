use ASIP;


SELECT * FROM user WHERE (user.id = 1) LIMIT 1;

SELECT DISTINCT user.id AS ids_user_id
FROM user
INNER JOIN branch ON branch.id = user.branch_id
INNER JOIN branch hotel ON hotel.id = branch.hotel_id
WHERE hotel.id = 1 AND branch.id = 1
ORDER BY user.id ASC
LIMIT 10;

SELECT user.id AS user_id, user.name AS user_name, user.username AS user_username, user.email AS user_email, 
       user.active AS user_active, user.password AS user_password, user._2FASecret AS user__2FASecret, 
       user.branch_id AS user_branch_id
FROM user
INNER JOIN branch ON branch.id = user.branch_id
INNER JOIN branch hotel ON hotel.id = branch.hotel_id
WHERE hotel.id = 3 AND branch.id = 3 AND user.id IN (2, 3, 4);





INSERT INTO hotel (code, name, image, email, active, phone, note, owner_name) 
VALUES
('H001', 'Grand Royal Hotel', '{"image": "image1.jpg"}', 'grandroyal@example.com', 1, '123-456-7890', 'Luxurious and elegant hotel in the city center.', 'John Smith'),
('H002', 'Sunset Boulevard Hotel', '{"image": "image2.jpg"}', 'sunsetboulevard@example.com', 1, '123-456-7891', 'Perfect location with stunning sunset views.', 'Emily Johnson'),
('H003', 'Mountain Peak Resort', '{"image": "image3.jpg"}', 'mountainpeak@example.com', 1, '123-456-7892', 'A relaxing retreat in the mountains.', 'Michael Williams'),
('H004', 'Seaside Paradise Hotel', '{"image": "image4.jpg"}', 'seasideparadise@example.com', 1, '123-456-7893', 'Luxury by the ocean with pristine beaches.', 'Sarah Brown'),
('H005', 'City Lights Hotel', '{"image": "image5.jpg"}', 'citylights@example.com', 1, '123-456-7894', 'Great views of the city skyline.', 'David Davis'),
('H006', 'Royal Garden Hotel', '{"image": "image6.jpg"}', 'royalgarden@example.com', 1, '123-456-7895', 'A peaceful escape with beautiful garden surroundings.', 'Laura Wilson'),
('H007', 'The Heritage Hotel', '{"image": "image7.jpg"}', 'heritagehotel@example.com', 1, '123-456-7896', 'Rich in history and charm, located in the heart of the city.', 'James Moore'),
('H008', 'Vista Grande Hotel', '{"image": "image8.jpg"}', 'vistagrande@example.com', 1, '123-456-7897', 'Modern luxury with panoramic city views.', 'Jennifer Taylor'),
('H009', 'The Emerald Inn', '{"image": "image9.jpg"}', 'emeraldinn@example.com', 1, '123-456-7898', 'A charming inn with luxurious interiors and a cozy atmosphere.', 'William Anderson'),
('H010', 'Ocean Breeze Resort', '{"image": "image10.jpg"}', 'oceanbreeze@example.com', 1, '123-456-7899', 'Relax by the beach with a refreshing ocean breeze.', 'Sophia Thomas'),
('H011', 'Moonlight Suites', '{"image": "image11.jpg"}', 'moonlightsuites@example.com', 1, '123-456-7900', 'Private suites with a view of the stars.', 'Alexander Jackson'),
('H012', 'Golden Sands Hotel', '{"image": "image12.jpg"}', 'goldensands@example.com', 1, '123-456-7901', 'The finest hospitality in a golden beach setting.', 'Olivia White'),
('H013', 'Royal Oasis Resort', '{"image": "image13.jpg"}', 'royaloasis@example.com', 1, '123-456-7902', 'Your oasis in the desert, offering relaxation and adventure.', 'Daniel Harris'),
('H014', 'Pinewood Lodge', '{"image": "image14.jpg"}', 'pinewoodlodge@example.com', 1, '123-456-7903', 'A tranquil retreat in the pine forests.', 'Sophia Clark'),
('H015', 'Luxury Heights Hotel', '{"image": "image15.jpg"}', 'luxuryheights@example.com', 1, '123-456-7904', 'High-end luxury and unparalleled service.', 'Christopher Lewis'),
('H016', 'Bella Vista Hotel', '{"image": "image16.jpg"}', 'bellavista@example.com', 1, '123-456-7905', 'Stunning vistas, world-class amenities.', 'Charlotte Robinson'),
('H017', 'The Crystal Palace', '{"image": "image17.jpg"}', 'crystalpalace@example.com', 1, '123-456-7906', 'An elegant hotel with crystal clear views and impeccable service.', 'Ethan Martinez'),
('H018', 'Starview Resort', '{"image": "image18.jpg"}', 'starviewresort@example.com', 1, '123-456-7907', 'Where every room has a perfect view of the stars.', 'Isabella Garcia'),
('H019', 'Coral Reef Hotel', '{"image": "image19.jpg"}', 'coralreef@example.com', 1, '123-456-7908', 'Dive into luxury with a tropical reef escape.', 'Liam Rodriguez'),
('H020', 'The Park Inn', '{"image": "image20.jpg"}', 'theparkinn@example.com', 1, '123-456-7909', 'A hotel surrounded by nature and beauty, ideal for all occasions.', 'Mason Perez'),
('H021', 'Sunrise Bay Resort', '{"image": "image21.jpg"}', 'sunrisebay@example.com', 1, '123-456-7910', 'Enjoy the sunrise with a view of the bay from every room.', 'Amelia Hall'),
('H022', 'The Westwood Hotel', '{"image": "image22.jpg"}', 'westwoodhotel@example.com', 1, '123-456-7911', 'Classic luxury with a modern twist.', 'Elijah Allen'),
('H023', 'Waterfront Retreat', '{"image": "image23.jpg"}', 'waterfrontretreat@example.com', 1, '123-456-7912', 'Get away to the serene waterfront retreat for ultimate relaxation.', 'Harper Young'),
('H024', 'Mountain Ridge Inn', '{"image": "image24.jpg"}', 'mountainridgeinn@example.com', 1, '123-456-7913', 'Stay at the ridge for a perfect mountain getaway.', 'Benjamin King'),
('H025', 'Cloud Nine Resort', '{"image": "image25.jpg"}', 'cloudnineresort@example.com', 1, '123-456-7914', 'Relax on Cloud Nine, the ultimate resort experience.', 'Madison Scott'),
('H026', 'Cedar Grove Hotel', '{"image": "image26.jpg"}', 'cedargrovehotel@example.com', 1, '123-456-7915', 'A peaceful retreat surrounded by cedar trees.', 'Noah Adams'),
('H027', 'Royal Palm Resort', '{"image": "image27.jpg"}', 'royalpalms@example.com', 1, '123-456-7916', 'Palm-lined walkways leading to pure luxury.', 'Mia Nelson'),
('H028', 'Silver Moon Hotel', '{"image": "image28.jpg"}', 'silvermoon@example.com', 1, '123-456-7917', 'Experience the elegance and charm of Silver Moon Hotel.', 'Lucas Carter'),
('H029', 'Lakeside Haven', '{"image": "image29.jpg"}', 'lakesidehaven@example.com', 1, '123-456-7918', 'A peaceful haven on the shores of the lake.', 'Ava Mitchell'),
('H030', 'The Magnolia Hotel', '{"image": "image30.jpg"}', 'magnoliahotel@example.com', 1, '123-456-7919', 'A blend of southern charm and modern amenities.', 'James Lee');





use ASIP;

INSERT INTO branch (name, email, phone, address, note, hotel_id, image, active) 
VALUES
('Sunset Boulevard Branch', 'sunset@boulevard.com', '123-456-8001', '123 Sunset Blvd, Los Angeles, CA, USA', 'Branch for Sunset Boulevard Hotel.', 3, '{"image": "branch1.jpg"}', 1),
('Mountain View Branch', 'mountain@view.com', '123-456-8002', '456 Mountain View Rd, Denver, CO, USA', 'Branch for Mountain Peak Resort.', 3, '{"image": "branch2.jpg"}', 1),
('Coastal Retreat Branch', 'coastal@retreat.com', '123-456-8003', '789 Ocean Dr, Miami, FL, USA', 'Branch for Seaside Paradise Hotel.', 3, '{"image": "branch3.jpg"}', 1),
('City Lights Branch', 'city@lights.com', '123-456-8004', '101 City Lights St, New York, NY, USA', 'Branch for City Lights Hotel.', 3, '{"image": "branch4.jpg"}', 1),
('Royal Garden Branch', 'royalgarden@hotel.com', '123-456-8005', '202 Royal Garden Rd, London, UK', 'Branch for Royal Garden Hotel.', 3, '{"image": "branch5.jpg"}', 1),
('Grand Horizon Branch', 'grand@horizon.com', '123-456-8006', '303 Grand Ave, Paris, France', 'Branch for Grand Horizon Hotel.', 3, '{"image": "branch6.jpg"}', 1),
('Moonlit Bay Branch', 'moonlit@bay.com', '123-456-8007', '404 Moonlit Bay Rd, Sydney, Australia', 'Branch for Moonlit Bay Resort.', 3, '{"image": "branch7.jpg"}', 1),
('Vista Grande Branch', 'vista@grande.com', '123-456-8008', '505 Vista Grande Ave, Barcelona, Spain', 'Branch for Vista Grande Hotel.', 3, '{"image": "branch8.jpg"}', 1),
('Crystal Palace Branch', 'crystal@palace.com', '123-456-8009', '606 Crystal Palace Blvd, Berlin, Germany', 'Branch for Crystal Palace Hotel.', 3, '{"image": "branch9.jpg"}', 1),
('The Park Inn Branch', 'parkinn@hotel.com', '123-456-8010', '707 Park St, Rome, Italy', 'Branch for The Park Inn.', 3, '{"image": "branch10.jpg"}', 1),
('The Heritage Branch', 'heritage@hotel.com', '123-456-8011', '808 Heritage Ln, Kyoto, Japan', 'Branch for The Heritage Hotel.', 3, '{"image": "branch11.jpg"}', 1),
('Starview Resort Branch', 'starview@resort.com', '123-456-8012', '909 Starview Blvd, Dubai, UAE', 'Branch for Starview Resort.', 3, '{"image": "branch12.jpg"}', 1),
('Sunrise Bay Branch', 'sunrise@bay.com', '123-456-8013', '101 Sunrise Bay Rd, Cape Town, South Africa', 'Branch for Sunrise Bay Resort.', 3, '{"image": "branch13.jpg"}', 1),
('Coral Reef Branch', 'coral@reef.com', '123-456-8014', '202 Coral Reef Rd, Cancun, Mexico', 'Branch for Coral Reef Hotel.', 3, '{"image": "branch14.jpg"}', 1),
('Golden Sands Branch', 'goldensands@hotel.com', '123-456-8015', '303 Golden Sands Ave, Maldives', 'Branch for Golden Sands Hotel.', 3, '{"image": "branch15.jpg"}', 1),
('Bella Vista Branch', 'bella@vista.com', '123-456-8016', '404 Bella Vista Blvd, Venice, Italy', 'Branch for Bella Vista Hotel.', 3, '{"image": "branch16.jpg"}', 1),
('Lakeside Haven Branch', 'lakeside@haven.com', '123-456-8017', '505 Lakeside Rd, Zurich, Switzerland', 'Branch for Lakeside Haven Hotel.', 3, '{"image": "branch17.jpg"}', 1),
('Blue Lagoon Branch', 'blue@lagoon.com', '123-456-8018', '606 Blue Lagoon St, Phuket, Thailand', 'Branch for Blue Lagoon Resort.',3, '{"image": "branch18.jpg"}', 1),
('Royal Palm Branch', 'royal@palm.com', '123-456-8019', '707 Palm Rd, Bali, Indonesia', 'Branch for Royal Palm Resort.', 3, '{"image": "branch19.jpg"}', 1),
('The Magnolia Branch', 'magnolia@hotel.com', '123-456-8020', '808 Magnolia St, New Orleans, LA, USA', 'Branch for The Magnolia Hotel.', 3, '{"image": "branch20.jpg"}', 1),
('Seabreeze Hotel Branch', 'seabreeze@hotel.com', '123-456-8021', '909 Seabreeze Ave, Cape Cod, MA, USA', 'Branch for Seabreeze Hotel.', 3, '{"image": "branch21.jpg"}', 1),
('Windy Ridge Branch', 'windyridge@hotel.com', '123-456-8022', '101 Windy Ridge Rd, Aspen, CO, USA', 'Branch for Windy Ridge Resort.',3, '{"image": "branch22.jpg"}', 1),
('Cedar Grove Branch', 'cedar@grove.com', '123-456-8023', '202 Cedar Grove Rd, Portland, OR, USA', 'Branch for Cedar Grove Hotel.', 3, '{"image": "branch23.jpg"}', 1),
('The Crystal Springs Branch', 'crystal@springs.com', '123-456-8024', '303 Crystal Springs Ave, Salt Lake City, UT, USA', 'Branch for The Crystal Springs Hotel.', 3, '{"image": "branch24.jpg"}', 1),
('Pacific Shores Branch', 'pacific@shores.com', '123-456-8025', '404 Pacific Shores Blvd, Honolulu, HI, USA', 'Branch for Pacific Shores Resort.', 3, '{"image": "branch25.jpg"}', 1),
('Highland View Branch', 'highland@view.com', '123-456-8026', '505 Highland View Rd, Denver, CO, USA', 'Branch for Highland View Hotel.', 3, '{"image": "branch26.jpg"}', 1),
('Ocean Breeze Branch', 'ocean@breeze.com', '123-456-8027', '606 Ocean Breeze Rd, Honolulu, HI, USA', 'Branch for Ocean Breeze Hotel.', 3, '{"image": "branch27.jpg"}', 1),
('Eagle’s Nest Branch', 'eagle@nest.com', '123-456-8028', '707 Eagle’s Nest Rd, Jackson Hole, WY, USA', 'Branch for Eagle’s Nest Lodge.', 3, '{"image": "branch28.jpg"}', 1),
('Golden Peak Branch', 'golden@peak.com', '123-456-8029', '808 Golden Peak St, Boulder, CO, USA', 'Branch for Golden Peak Resort.', 3, '{"image": "branch29.jpg"}', 1),
('Riverstone Lodge Branch', 'riverstone@lodge.com', '123-456-8030', '909 Riverstone Ave, Sedona, AZ, USA', 'Branch for Riverstone Lodge.', 3, '{"image": "branch30.jpg"}', 1);
