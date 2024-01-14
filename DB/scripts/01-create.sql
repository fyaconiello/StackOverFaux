create table if not exists users
(
    id   serial
        primary key,
    name varchar(255) not null
        unique
);

create table if not exists questions
(
    id       serial
        constraint questions_pk
            primary key,
    body     text                    not null,
    user_id  integer                 not null
        constraint questions_users_id_fk
            references users,
    creation timestamp default now() not null,
    score    integer   default 0     not null,
    title    varchar(255)            not null
);

create table if not exists answers
(
    body        text                    not null,
    creation    timestamp default now() not null,
    score       integer   default 0,
    user_id     integer                 not null
        constraint answers_users_id_fk
            references users,
    id          serial
        constraint answers_pk
            primary key,
    accepted    boolean   default false not null,
    question_id integer                 not null
        constraint answers_questions_id_fk
            references questions
);

create table if not exists comments
(
    id          serial
        constraint comments_pk
            primary key,
    body        text    not null,
    user_id     integer not null
        constraint comments_users_id_fk
            references users,
    answer_id   integer
        constraint comments_answers_id_fk
            references answers,
    question_id integer
        constraint comments_questions_id_fk
            references questions
);