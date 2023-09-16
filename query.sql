-- name: GetUser :one
select * from users where id = $1 limit 1;

-- name: ListUser :many
SELECT
	*,
	count(*) OVER () AS total
FROM
	users
where
limit case when @max::int > 0 then @max::int else null end
offset @skip::int;


-- name: CreateUser :one
insert into users (username, email)
values (@username, @email)
returning id;

-- name: UpdateUser :one
update users
set
    email = case when @email_do_update::bool then @email else email end,
    username = case when @username_do_update::bool then @username else username end
where
    id = @id
returning *;