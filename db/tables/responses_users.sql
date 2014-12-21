create table notes_tags(
  response_id varchar(140) not null references responses(id),
  user_id integer not null references users(id)
);
