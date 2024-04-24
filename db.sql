create table folder(
    id serial primary key not null, 
    name varchar not null
)

create table memo(
    id serial primary key not null,
    folder_id integer not null,
    name varchar not null,
    title varchar not null,
    body varchar not null,

    foreign key (folder_id) REFERENCES folder(id) on delete CASCADE
)
