CREATE DATABASE kitchen_keeper;

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "password" VARCHAR(1000) NOT NULL,
    "access" INT NOT NULL,
    "first_name" VARCHAR(80) NOT NULL,
    "last_name" VARCHAR(80) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL
);

CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "company" VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT "company_pk" PRIMARY KEY ("id"),
);

CREATE TABLE "user_company" (
    "id" SERIAL NOT NULL,
    "company_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    CONSTRAINT "user_company_pk" PRIMARY KEY ("id"),
    CONSTRAINT "user_company_fk0" FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    CONSTRAINT "user_company_fk1" FOREIGN KEY ("company_id") REFERENCES "company" ("id")
);

CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "company_id" INT NOT NULL,
    "item" VARCHAR(255) NOT NULL,
    "quantity" DECIMAL(10, 2) NOT NULL,
    "minimumStock" DECIMAL(10, 2) NOT NULL,
    "unit" VARCHAR(255) NOT NULL,
    CONSTRAINT "inventory_pk" PRIMARY KEY ("id"),
    CONSTRAINT "inventory_fk0" FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE CASCADE
);

CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "dish" VARCHAR(255) NOT NULL,
    "price" INT NOT NULL,
    "image" VARCHAR NOT NULL,
    "company_id" INT NOT NULL,
    CONSTRAINT "menu_pk" PRIMARY KEY ("id"),
    CONSTRAINT "menu_fk0" FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE CASCADE
);

CREATE TABLE "menu_inventory" (
    "id" SERIAL NOT NULL,
    "menu_id" INT NOT NULL,
    "inventory_id" INT NOT NULL,
    "quantity" INT NOT NULL,
    "unit" VARCHAR(255) NOT NULL,
    CONSTRAINT "menu_inventory_pk" PRIMARY KEY ("id"),
    CONSTRAINT "menu_inventory_fk0" FOREIGN KEY ("menu_id") REFERENCES "menu" ("id") ON DELETE CASCADE,
    CONSTRAINT "menu_inventory_fk1" FOREIGN KEY ("inventory_id") REFERENCES "inventory" ("id") ON DELETE CASCADE
);

CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "menu_id" INT NOT NULL,
    "date" DATE NOT NULL,
    "amountSold" INT NOT NULL,
    "company_id" INT NOT NULL,
    CONSTRAINT "sales_pk" PRIMARY KEY ("id"),
    CONSTRAINT "sales_fk0" FOREIGN KEY ("menu_id") REFERENCES "menu" ("id") ON DELETE CASCADE,
    CONSTRAINT "sales_fk1" FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE CASCADE
);

CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "company_id" INT NOT NULL,
    "name" VARCHAR(1500) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "title" VARCHAR(15) NOT NULL,
    CONSTRAINT "team_pk" PRIMARY KEY ("id"),
    CONSTRAINT "team_fk0" FOREIGN KEY ("company_id") REFERENCES "company" ("id")
);

CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "contact_company" VARCHAR(100) NOT NULL,
    "company_id" INT NOT NULL,
    CONSTRAINT "contacts_pk" PRIMARY KEY ("id"),
    CONSTRAINT "contacts_fk0" FOREIGN KEY ("company_id") REFERENCES "company" ("id")
);

CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "supplier" VARCHAR(200) NOT NULL,
    "date" DATE NOT NULL,
    "company_id" INT NOT NULL,
    CONSTRAINT "orders_pk" PRIMARY KEY ("id"),
    CONSTRAINT "orders_fk0" FOREIGN KEY ("company_id") REFERENCES "company" ("id")
);

CREATE TABLE "orders_inventory" (
    "id" SERIAL NOT NULL,
    "inventory_id" INT NOT NULL,
    "orders_id" INT NOT NULL,
    "quantity" INT NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    CONSTRAINT "orders_inventory_pk" PRIMARY KEY ("id"),
    CONSTRAINT "orders_inventory_fk0" FOREIGN KEY ("inventory_id") REFERENCES "inventory" ("id"),
    CONSTRAINT "orders_inventory_fk1" FOREIGN KEY ("orders_id") REFERENCES "orders" ("id") ON DELETE CASCADE
);

CREATE TABLE "pending_users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "passkey" VARCHAR(10) NOT NULL UNIQUE,
    "timestamp" TIMESTAMP NOT NULL,
    "company_id" INT NOT NULL,
    CONSTRAINT "pending_users_fk0" FOREIGN KEY ("company_id") REFERENCES "company" ("id")
);