create table ilikes(
  user_id integer not null references users(id),
  image_id integer references images(id),
  day_id integer not null references days(id)
);
