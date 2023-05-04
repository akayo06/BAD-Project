create table user (
    id serial primary key,
    username varchar(20) not null unique,
    password varchar(30) not null,
    is_admin boolean,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp
);
create table food (
    id serial primary key,
    energy integer,
    protein integer,
    total_fat integer,
    saturated_fat integer,
    trans_fat integer,
    carbonhydrate integer,
    sugars integer,
    sodium integer
);
create table diet_record (
    id serial primary key,
    date datetime,
    user_id integer,
    section enum ['breakfast', 'lunch', 'dinner'],
    active boolean default true,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp
);
create table food_in_diet (
    id serial primary key,
    diet_record_id integer,
    diet_record.id food_id integer
);
create table shape_record (
    id serial primary key,
    user integer,
    height integer,
    weight integer,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp
);
create table daily_nutrition_target (
    id serial primary key,
    user_id integer,
    energy integer,
    protein integer,
    total_fat integer,
    saturated_fat integer,
    trans_fat integer,
    carbonhydrate integer,
    sugars integer,
    sodium integer,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp
);
create table favourite_mealset (
    id serial primary key,
    user integer,
);
create table "set" (
    id serial primary key,
    food_id integer,
    set_name varchar(32)
);
create table mealset (
    id serial primary key,
    food_id integer,
    set_id integer
);