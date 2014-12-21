create table responses(
  id serial primary key,
  response varchar(140) not null,
  created_at timestamp not null default now(),
  survey_id integer not null references surveys(id),
  day_id integer not null references days(id),
  user_id integer not null references users(id)
);
