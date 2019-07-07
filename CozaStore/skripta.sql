create database `e-commerce`;
use databse;

CREATE TABLE `category` (
   `categoryId` int(11) NOT NULL AUTO_INCREMENT,
   `catName` varchar(150)  ,
   PRIMARY KEY (`categoryId`)
 ) ;
 

CREATE TABLE `subcategory` (
   `subcategoryId` int(11) NOT NULL AUTO_INCREMENT,
   `categoryId` int(11)  ,
   `subcatName` varchar(150)  ,
   PRIMARY KEY (`subcategoryId`),
   FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE

  
 ) ;
 
 CREATE TABLE `orders` (
   `orderId` int(11) NOT NULL AUTO_INCREMENT,
   `productId` int(11) ,
   `nrOrders` int(100) ,
   PRIMARY KEY (`orderId`)
 ) ;
 
 CREATE TABLE `users` (
   `userId` int(11) NOT NULL AUTO_INCREMENT,
   `userEmail` varchar(100) ,
   PRIMARY KEY (`userId`)
 ) ;
 
  CREATE TABLE `photos_of_products` (
   `ppid` int(11) NOT NULL AUTO_INCREMENT,
   `productId` int(11) ,
   `photoname` varchar(200) ,
   PRIMARY KEY (`ppid`)
 ) ;
 
 
 
 
 CREATE TABLE `products` (
   `productId` int(11) NOT NULL AUTO_INCREMENT,
   `categoryId` int(11)  ,
   `subcategoryId` int(11) ,
   `pName` varchar(100)  ,
   `pPrice` double  ,
   `pWeight` double  ,
   `pDescription` varchar(5000)  ,
   `photoblob` blob  ,
   `photourl` varchar(200),
   `photoname` varchar(200),
   `gender` varchar(10),
   `sector` varchar(50),
   `colors` varchar(150),
   `numbers` varchar(150),
   `material`varchar(150),
   PRIMARY KEY (`productId`),
	FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`subcategoryId`) REFERENCES `subcategory` (`subcategoryId`) ON DELETE CASCADE ON UPDATE CASCADE
 ) ;
 
 
 INSERT INTO `e-commerce`.`category` (`catName`) VALUES ('Bags');

INSERT INTO `e-commerce`.`category` (`catName`) VALUES ('Shoes');


INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('1', 'Wallets');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('1', 'Belt ');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('1', 'Shoulder ');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('1', 'Clutch ');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('1', ' Accessories');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('2', 'Sandals');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('2', 'Heels');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('2', 'Sneakers');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('2', 'Boots');

INSERT INTO `e-commerce`.`subcategory` (`categoryId`, `subcatName`) VALUES ('2', 'Casual ');











 
