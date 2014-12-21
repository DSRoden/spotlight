create table notes(
  id serial primary key,
  created_at timestamp not null default now(),
  user_id integer not null references users(id)
);
