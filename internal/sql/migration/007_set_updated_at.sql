CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
AS $$
BEGIN
    NEW.updated_at := current_timestamp;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;


CREATE TRIGGER if not exists users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER if not exists posts_set_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();


CREATE TRIGGER if not exists comments_set_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();