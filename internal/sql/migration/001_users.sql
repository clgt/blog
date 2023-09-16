create table if not exists users (
    id uuid not null default gen_ulid() primary key,
	username text not null default '',
    email text not null default '',
    encrypted_password text not null default '',
    roles text[] not null default '{}',
    verify_token text not null default '',
    verify_token_sent_at timestamptz not null default '0001-01-01 00:00:00',
    reset_password_token text not null default '',
    reset_password_token_sent_at timestamptz not null default '0001-01-01 00:00:00',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default '0001-01-01 00:00:00'
);

create unique index if not exists idx_users_email on users using btree(email) where email <> '';
