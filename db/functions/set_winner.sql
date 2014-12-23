DROP FUNCTION set_winner(integer);
create or replace function set_winner (uid integer)
  returns table (userid integer, username varchar, password char,email varchar,phone varchar, avatar varchar,token char, created_at timestamp) AS $$
  declare
  active boolean;

  begin
  UPDATE days SET active = DEFAULT;
  INSERT into days (user_id) values (uid);
  UPDATE days SET active= true WHERE user_id= uid;

  end;
  $$ language plpgsql;
