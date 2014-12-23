DROP FUNCTION set_winner(integer, char(60));
create or replace function set_winner (uid integer, hash char(60))
  returns table (userid integer, username varchar, password char,email varchar,phone varchar, avatar varchar,token char, created_at timestamp) AS $$
  declare
  active boolean;

  begin
  UPDATE days SET active = DEFAULT;
  INSERT into days (user_id, password) values (uid, hash);
  end;
  $$ language plpgsql;
