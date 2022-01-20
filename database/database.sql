CREATE DATABASE stock_app_refactor;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE users
(
  user_id serial,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE public.holdings
(
    holding_id serial,
    user_id serial REFERENCES users(user_id) NOT NULL,
    name character varying NOT NULL,
    symbol character varying NOT NULL,
    shares integer NOT NULL,
    price decimal NOT NULL,
    percent_change character varying NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (holding_id)
);
