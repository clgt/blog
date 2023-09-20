CREATE TABLE IF NOT EXISTS archive (
    id serial PRIMARY KEY,
    origin_id INT NOT NULL DEFAULT 0,
    payload JSONB NOT NULL DEFAULT '{}'::JSONB,
    deleted_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    origin_table TEXT NOT NULL DEFAULT ''
);

CREATE OR REPLACE FUNCTION to_archive()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
BEGIN
    EXECUTE 'INSERT INTO archive (payload, origin_id, origin_table) VALUES ($1, $2, $3)'
    USING to_jsonb(OLD.*), OLD.id, TG_TABLE_NAME;
    RETURN OLD;
END;
$$;

CREATE TRIGGER archive_post_trigger
    AFTER DELETE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION to_archive();
