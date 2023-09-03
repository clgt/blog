create table if not exists posts (
    id uuid not null default '00000000-0000-0000-0000-000000000000' primary key,
	title text not null default '',
    slug text not null default '',
    poster text not null default '',
    tags text[] not null default '{}',
    short text not null default '',
    body text not null default '',
	author_id uuid not null default '00000000-0000-0000-0000-000000000000',
    published_at timestamptz not null default '0001-01-01 00:00:00',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default '0001-01-01 00:00:00'
);

create unique index if not exists idx_posts_slug on posts using btree(slug) where slug <> '';
create index if not exists idx_posts_author_id on posts using btree(author_id) where author_id > 0;
