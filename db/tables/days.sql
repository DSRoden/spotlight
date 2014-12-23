create table days(
  id serial primary key,
  created_at timestamp not null default now(),
  user_id integer not null references users(id),
  password char(60),
  active boolean DEFAULT false
);
