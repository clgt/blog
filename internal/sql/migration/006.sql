-- comment now can be hidden
alter table comments add column if not exists is_hidden bool not null default false;

-- user can be blocked
alter table users add column if not exists is_blocked bool not null default false;