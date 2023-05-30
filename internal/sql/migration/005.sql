alter table posts add column if not exists is_editors_pick bool not null default false;
update posts set is_editors_pick = false where is_editors_pick is null;