create table users(
    id serial primary key,
    username varchar(255) unique not null,
    password char(60) not null,
    email varchar(150) unique not null,
    phone varchar(50),
    avatar varchar(200),
    token char(96) not null,
    spotlightpass char(5),
    created_at timestamp not null default now()
);
