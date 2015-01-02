create or replace function show_note (uid integer, nid integer)
returns table (note_id integer, title varchar, body text, updated_at timestamp, tags varchar[], urls varchar[]) AS $$
declare
begin

  return query
    select d.id, d.created_at, array_agg(distinct u.username), array_agg(m), array_agg(i)
    from days d
    inner join users u on u.id = d.user_id
    inner join messages m on m.day_id = d.id
    left outer join images i on i.day_id = d.id
    where d.id = 66
    group by d.id;


end;
$$ language plpgsql;
