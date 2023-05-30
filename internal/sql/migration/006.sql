-- comment now can be hidden
alter table comments add column if not exists is_hidden bool not null default false;
update comments set is_hidden = false where is_hidden is null;

-- user can be blocked
alter table users add column if not exists is_blocked bool not null default false;
update users set is_blocked = false where is_blocked is null;