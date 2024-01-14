----
-- Extract question's users data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO users (id, name)
SELECT
    (jsonb_path_query(json_data.file_content, '$.user.id')::text)::integer AS id,
    (jsonb_path_query(json_data.file_content, '$.user.name')::text)::varchar AS name
FROM json_data;

----
-- Extract questions data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO questions (id, title, body, creation, score, user_id)
SELECT
    (jsonb_path_query(element, '$.id')::text)::integer AS id,
    jsonb_path_query(element, '$.title')::varchar(255) AS title,
    jsonb_path_query(element, '$.body')::text AS body,
    to_timestamp(jsonb_path_query(element, '$.creation')::bigint) AS creation,
    (jsonb_path_query(element, '$.score')::text)::integer AS score,
    (jsonb_path_query(element, '$.user.id')::text)::integer AS id
FROM json_data,
      LATERAL jsonb_array_elements(file_content) AS element;

----
-- Extract answers' users data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO users (id, name)
SELECT
    (jsonb_path_query(a_element, '$.user.id')::text)::integer AS id,
    (jsonb_path_query(a_element, '$.user.name')::text)::varchar AS name
FROM json_data,
     LATERAL jsonb_array_elements(file_content) AS q_element,
     LATERAL jsonb_array_elements(q_element->'answers') AS a_element
ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name;

----
-- Extract answers data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO answers (id, body, creation, score, accepted, user_id, question_id)
SELECT
    (jsonb_path_query(a_element, '$.id')::text)::integer AS id,
    jsonb_path_query(a_element, '$.body')::text AS body,
    to_timestamp(jsonb_path_query(a_element, '$.creation')::bigint) AS creation,
    (jsonb_path_query(a_element, '$.score')::text)::integer AS score,
    jsonb_path_query(a_element, '$.accepted')::bool AS accepted,
    (jsonb_path_query(a_element, '$.user.id')::text)::integer AS user_id,
    (jsonb_path_query(q_element, '$.id')::text)::integer AS question_id
FROM json_data,
     LATERAL jsonb_array_elements(file_content) AS q_element,
     LATERAL jsonb_array_elements(q_element->'answers') AS a_element;

----
-- Extract questions' comments' user data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO users (id, name)
SELECT DISTINCT ON (id)
    (jsonb_path_query(c_element, '$.user.id')::text)::integer AS id,
    (jsonb_path_query(c_element, '$.user.name')::text)::varchar AS name
FROM json_data,
     LATERAL jsonb_array_elements(file_content) AS q_element,
     LATERAL jsonb_array_elements(q_element->'comments') AS c_element
ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name;

----
-- Extract questions' comments' data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO comments (id, body, user_id, question_id)
SELECT
    (jsonb_path_query(c_element, '$.id')::text)::integer AS id,
    jsonb_path_query(c_element, '$.body')::text AS body,
    (jsonb_path_query(c_element, '$.user.id')::text)::integer AS user_id,
    (jsonb_path_query(q_element, '$.id')::text)::integer AS question_id
FROM json_data,
     LATERAL jsonb_array_elements(file_content) AS q_element,
     LATERAL jsonb_array_elements(q_element->'comments') AS c_element;


----
-- Extract answers' comments' user data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO users (id, name)
SELECT DISTINCT ON (id)
    (jsonb_path_query(c_element, '$.user.id')::text)::integer AS id,
    (jsonb_path_query(c_element, '$.user.name')::text)::varchar AS name
FROM json_data,
     LATERAL jsonb_array_elements(file_content) AS q_element,
     LATERAL jsonb_array_elements(q_element->'answers') AS a_element,
     LATERAL jsonb_array_elements(a_element->'comments') AS c_element
ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name;

----
-- Extract questions' comments' data from JSON
----
WITH json_data(file_content) AS (
    SELECT pg_read_file('/docker-entrypoint-initdb.d/00-stackoverfaux.json')::jsonb
)
-- Transform and Load data into tables
INSERT INTO comments (id, body, user_id, answer_id)
SELECT
    (jsonb_path_query(c_element, '$.id')::text)::integer AS id,
    jsonb_path_query(c_element, '$.body')::text AS body,
    (jsonb_path_query(c_element, '$.user.id')::text)::integer AS user_id,
    (jsonb_path_query(a_element, '$.id')::text)::integer AS answer_id
FROM json_data,
     LATERAL jsonb_array_elements(file_content) AS q_element,
     LATERAL jsonb_array_elements(q_element->'answers') AS a_element,
     LATERAL jsonb_array_elements(a_element->'comments') AS c_element;