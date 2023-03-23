
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- CREATE TABLE kitchen-keeper
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
)WITH (
  OIDS=FALSE
);


CREATE TABLE "company" (
	"id" serial NOT NULL,
	"company" varchar(255) NOT NULL UNIQUE,
	"user_id" int NOT NULL,
	CONSTRAINT "company_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "inventory" (
	"id" serial NOT NULL,
	"company_id" int NOT NULL,
	"item" varchar(255) NOT NULL,
	"quantity" int NOT NULL,
	"minimumStock" int NOT NULL,
	"unit" varchar(255) NOT NULL,
	CONSTRAINT "inventory_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "menu" (
	"id" serial NOT NULL,
	"dish" varchar(255) NOT NULL,
	"price" int NOT NULL,
	"image" varchar NOT NULL,
	"company_id" int NOT NULL,
	CONSTRAINT "menu_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "menu_inventory" (
	"id" serial NOT NULL,
	"menu_id" int NOT NULL,
	"inventory_id" int NOT NULL,
	"quantity" int NOT NULL,
	"unit" varchar(255) NOT NULL,
	CONSTRAINT "menu_inventory_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sales" (
	"id" serial NOT NULL,
	"menu_id" int NOT NULL,
	"date" date NOT NULL,
	"amountSold" int NOT NULL,
	"company_id" int NOT NULL,
	CONSTRAINT "sales_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "team" (
	"id" serial NOT NULL,
	"company_id" int NOT NULL,
	"name" varchar(1500) NOT NULL,
	"email" varchar(200) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"title" varchar(15) NOT NULL,
	CONSTRAINT "team_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "contacts" (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(200) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"address" varchar(20) NOT NULL,
	"company" varchar(20) NOT NULL,
	CONSTRAINT "contacts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "orders"(
	"id" serial NOT NULL,
	"supplier" varchar(200) NOT NULL,
	"date" date NOT NULL,
	"company_id" int NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "orders_inventory"(
	"id" serial NOT NULL,
	"inventory_id" int NOT NULL,
	 "orders_id", int NOT NULL,
	 "quantity" int NOT NULL,
	 "unit" varchar(20) NOT NULL,
	 CONSTRAINT "orders_inventory_pk" PRIMARY KEY ("id")
)WITH (
  OIDS=FALSE
);




ALTER TABLE "company" ADD CONSTRAINT "company_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "inventory" ADD CONSTRAINT "inventory_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("id");

ALTER TABLE "menu_inventory" ADD CONSTRAINT "menu_inventory_fk0" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE CASCADE
ALTER TABLE "menu_inventory" ADD CONSTRAINT "menu_inventory_fk1" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id");

ALTER TABLE "sales" ADD CONSTRAINT "sales_fk0" FOREIGN KEY ("menu_id") REFERENCES "menu"("id");
ALTER TABLE "sales" ADD CONSTRAINT "sales_fk0" FOREIGN Key ("company_id") REFERENCES "company"("id");

ALTER TABLE "team" ADD CONSTRAINT "team_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("id");

ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("id");

ALTER TABLE "orders_inventory" ADD CONSTRAINT "orders_inventory_fk0" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id");
ALTER TABLE "orders_inventory" ADD CONSTRAINT "orders_inventory_fk1" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE CASCADE;
--MOCK DATA

--INVENTORY
INSERT INTO "inventory" ("company_id", "item", "quantity", "minimumStock", "unit")
VALUES 
(1, 'Hamburger Meat', 500, 150, 'Oz'),
(1, 'Lettuce', 500, 150, 'Oz'),
(1, 'American Cheese', 500, 150, 'Oz'),
(1, 'Bacon', 500, 150, 'Oz'),
(1, 'Ham', 500, 150, 'Oz'),
(1, 'Pulled Pork', 500, 150, 'Oz'),
(1, 'Pickles', 500, 150, 'Oz'),
(1, 'Swiss Cheese', 500, 150, 'Oz'),
(1, 'Mustard', 5000, 1500, 'Fl. Oz'),
(1, 'White Bread', 300, 5, 'Oz'),
(1, 'Turkey', 500, 150, 'Oz'),
(1, 'Tomato', 500, 150, 'Oz'),
(1, 'Mayonaise', 3000, 1000, 'Fl. Oz'),
(1, 'Caesar Dressing', 3000, 1000, 'Fl. Oz'),
(1, 'Chicken Breast', 500, 100, 'Oz'),
(1, 'Hamburger Bun', 300, 90, 'Oz'),
(1, 'Tortilla Chips', 500, 100, 'Oz'),
(1, 'Nacho Cheese', 3000, 1000, 'Fl. Oz'),
(1, 'Onions', 300, 100, 'Oz'),
(1, 'Jalepeños', 100, 30, 'Oz'),
(1, 'Pretzel Dough', 3000, 1000, 'Oz'),
(1, 'Beer Cheese', 2000, 1000, 'Fl. Oz'),
(1, 'Chicken Wings', 300, 100, 'Oz'),
(1, 'Buffalo Sauce', 2500, 1000, 'Fl. Oz'),
(1, 'Marble Rye Bread', 250, 100, 'Oz'),
(1, 'Corned Beef', 300, 100, 'Oz'),
(1, 'Sauerkraut', 300, 100, 'Oz');

--MENU
INSERT INTO "menu" ("dish", "price", "image", "company_id")
VALUES
('Bacon Cheese Burger', 19, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrv3l6GVOIP386K8Pphvh7C0T6NRwVTStbYTkq-5tT-TTkuT_1eL3aaY6O96qypSW1Ljpjcy5ux_M&usqp=CAU&ec=48600112', 1),
('Cuban Sandwich', 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwo_mQlJ9qq7FxpaKKOBDgGizzsAC03P1t4uG5GICpyw&usqp=CAU&ec=48600112', 1),
('Club Sandwich', 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvj3wI2gi6l0wI_His6l3_AAdf-dkFEPIOGOF_qPbmve6zNrRSLAFVCsqKIhd9Cz8ilgyTiV4mFJ4&usqp=CAU&ec=48600112', 1),
('Reuben Sandwich', 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvl_BKfo9QfDz4pygHLX9qBzHJNzhYBPF5vTTMMAVURQ&usqp=CAU&ec=48600112', 1),
('Caesar Salad', 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsrQlLX45GfcBp2Uiy3NFUEqe4HMxsEiS3xoEgCauuYA&usqp=CAU&ec=48600112', 1),
('Nachos', 14, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSHHG555JAeFgtfkvdmc_AVevD0ImeUCxV7POfs64-iA&usqp=CAU&ec=48600112', 1),
('Pretzel with Beer Cheese', 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9a9NsKYMUKs49fQ0DTEKqHRjwxXs1ujpslJN46zIiJ2t6bH1xjJBI9-D6lCIV8-eNamhIQoqZLE&usqp=CAU&ec=48600112', 1),
('Buffalo Wings', 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN1n7sVtV2tnreYBodVADurfPIXEodaxKP7byu5TyYw&usqp=CAU&ec=48600112', 1);
 
 --MENU_INVENTORY
INSERT INTO "menu_inventory" ("menu_id", "inventory_id", "quantity", "unit")
VALUES 
(1, 1, 8, 'Oz'),
(1, 2, 2, 'Oz'),
(1, 3, 1, 'Oz'),
(1, 4, 6, 'Oz'),
(1, 16, 4, 'Oz'),
(2, 10, 4, 'Oz'),
(2, 6, 8, 'Oz'),
(2, 7, 1, 'Oz'),
(2, 8, 1, 'Oz'),
(2, 9, 1, 'Fl. Oz'),
(2, 5, 4, 'Oz'),
(3, 10, 4, 'Oz'),
(3, 11, 6, 'Oz'),
(3, 5, 6, 'Oz'),
(3, 2, 2, 'Oz'),
(3, 12, 6, 'Oz'),
(3, 4, 4, 'Oz'),
(3, 13, 1, 'Fl. Oz'),
(4, 8, 1, 'Oz'),
(4, 25, 6, 'Oz'),
(4, 6, 7, 'Oz'),
(4, 27, 3, 'Oz'),
(5, 2, 12, 'Oz'),
(5, 15, 7, 'Oz'),
(5, 14, 2, 'Fl. Oz'),
(6, 17, 12, 'Oz'),
(6, 18, 3, 'Fl. Oz'),
(6, 19, 1, 'Oz'),
(6, 12, 1, 'Oz'),
(6, 20, 1, 'Oz'),
(6, 1, 2, 'Oz'),
(7, 21, 10, 'Oz'),
(7, 22, 4, 'Fl. Oz'),
(8, 23, 12, 'Oz'),
(8, 21, 1.5, 'Fl. Oz');

















