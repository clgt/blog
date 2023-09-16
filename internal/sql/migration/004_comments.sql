create table if not exists comments (
    id uuid primary key,
    author_id uuid not null,
    parent_id uuid not null,
    slug text not null default '',
    body text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default '0001-01-01 00:00:00'
);

CREATE INDEX idx_comments_parent_id ON comments USING btree(parent_id);
CREATE INDEX idx_comments_author_id ON comments USING btree(author_id);
CREATE INDEX idx_comments_slug ON comments USING btree(slug);