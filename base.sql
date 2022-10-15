-- Active: 1665858920600@@127.0.0.1@5432@btek-course@public

CREATE EXTENSION 'uuid-ossp';

CREATE OR REPLACE FUNCTION TRIGGER_SET_TIMESTAMP() 
RETURNS TRIGGER AS $$ 
	BEGIN NEW."updatedAt" = NOW();
	RETURN NEW;
	END $$ LANGUAGE 
PLPGSQL; 

CREATE TABLE
    "users" (
        "id" VARCHAR(255) default uuid_generate_v4(),
        "email" VARCHAR(255),
        "password" VARCHAR(255),
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "users" add primary key ("id");

CREATE TRIGGER SET_TIMESTAMP 
	before
	update on "users" for each row
	execute
	    procedure trigger_set_timestamp();
; 
