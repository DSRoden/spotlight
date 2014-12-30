create table images(
  id serial primary key,
  url varchar(1000) not null,
  user_id integer not null references users(id),
  day_id integer not null references days(id),
  created_at timestamp not null default now(),
  likes integer
);
