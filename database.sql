
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
	"date" varchar(20) NOT NULL,
	"amountSold" int NOT NULL,
	CONSTRAINT "sales_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "team" (
	"id" serial NOT NULL,
	"company_id" int NOT NULL,
	"name" varchar(150) NOT NULL,
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
	"date" date NOT NULL
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- CREATE TABLE "orders_inventory"(
-- 	"id" se
-- )




ALTER TABLE "company" ADD CONSTRAINT "company_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "inventory" ADD CONSTRAINT "inventory_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("id");


ALTER TABLE "menu_inventory" ADD CONSTRAINT "menu_inventory_fk0" FOREIGN KEY ("menu_id") REFERENCES "menu"("id");
ALTER TABLE "menu_inventory" ADD CONSTRAINT "menu_inventory_fk1" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id");

ALTER TABLE "sales" ADD CONSTRAINT "sales_fk0" FOREIGN KEY ("menu_id") REFERENCES "menu"("id");

ALTER TABLE "team" ADD CONSTRAINT "team_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("id");

--MOCK DATA