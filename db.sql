create table folder(
    id serial primary key not null, 
    name varchar not null unique
)

create table memo(
    id serial primary key not null,
    folder_id integer not null,
    name varchar not null,
    title varchar not null default '',
    body varchar not null default '',

    foreign key (folder_id) REFERENCES folder(id) on delete CASCADE
)
