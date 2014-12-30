create table likes(
  user_id integer not null references users(id),
  message_id integer not null references messages(id),
  day_id integer not null references days(id)
);
