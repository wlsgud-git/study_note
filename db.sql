create table folder(
    id varchar not null primary key,
    name varchar not null
)

create table memo(
    id varchar not null primary key, 
    folder_id varchar not null,
    name varchar not null,
    title varchar not null,
    body varchar not null,

    foreign key (folder_id) REFERENCES folder(id) on delete CASCADE
)
