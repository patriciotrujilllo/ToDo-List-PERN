-- Active: 1691351181825@@127.0.0.1@5432@todoapp

CREATE DATABASE todoapp;

\c todoapp;

CREATE TABLE
    todos(
        id UUID primary key,
        user_email TEXT not null,
        title TEXT not null,
        progress integer not null,
        date text
    );

CREATE TABLE
    users (
        email TEXT not null,
        hashed_password TEXT not null
    );