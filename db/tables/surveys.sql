create table surveys(
  id serial primary key,
  question varchar(140) not null,
  created_at timestamp not null default now(),
  user_id integer not null references users(id),
  day_id integer not null references days(id)
);
