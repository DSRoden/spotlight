create or replace function show_day (did integer)
  returns table (id integer, created_at timestamp, username varchar[]) AS $$
  declare
  begin

  return query
  select d.id, d.created_at, array_agg(distinct u.username)
  from days d
  inner join users u on u.id = d.user_id
  where d.id = did
  group by d.id;
  
  end;
  $$ language plpgsql;
