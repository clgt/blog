alter table posts add column if not exists publisher_first_name text not null default  '';
alter table posts add column if not exists publisher_last_name text not null default '';