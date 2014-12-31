create table mlikes(
  user_id integer not null references users(id),
  message_id integer references messages(id),
  day_id integer not null references days(id)
);
