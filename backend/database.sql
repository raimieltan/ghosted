CREATE table users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    user_age int not null,
    user_password VARCHAR(255) NOT NULL,
    user_email varchar(255) not null
);

insert into users VALUES(default, 'Liza', 'Soberano', 23, '123456', 'liza@gmail.com');