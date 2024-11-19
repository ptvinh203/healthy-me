/*
 * ------------------------------ ENUM ------------------------------
 */

-- Account role enum
create type account_role as ENUM ('CUSTOMER', 'RESTAURANT', 'ADMIN');

-- Gender enum
create type customer_gender as ENUM ('MALE', 'FEMALE', 'OTHER');

-- Health goal enum
create type healthy_goal as ENUM ('GAIN', 'LOSE', 'MAINTAIN');

-- Item type enum
create type item_type as ENUM ('MAIN_FOOD', 'FAST_FOOD', 'DRINK');

-- Shopping cart state
create type shopping_cart_state as ENUM ('PAID', 'UNPAID');

-- Gender enum
create type restaurant_status as ENUM ('AWAITING_APPROVAL', 'APPROVED', 'APPROVAL_FAILED');
/*
 * ------------------------------ TABLE ------------------------------
 */

-- Table accounts
create table if not exists accounts
(
    id            bigserial primary key,
    name          varchar(255) ,
    email         varchar(255) not null unique,
    avatar        text,
    password      text         not null,
    role          account_role not null,
    created_at    timestamp    not null default current_timestamp,
    updated_at    timestamp,
    deleted_at    timestamp
);

-- Table customers
create table if not exists customers
(
    id                bigserial primary key,
    date_of_birth     timestamp       not null,
    address           varchar(400)     ,
    phone_number      varchar(20)      ,
    gender            customer_gender not null default 'OTHER'::customer_gender,
    height            numeric         not null,
    weight            numeric         not null,
    account_id        bigint          not null unique references accounts (id),
    bmi               numeric,
    heart_rate        numeric,
    blood_glucose     numeric,
    blood_pressure    numeric,
    chest_measurement numeric,
    waist_measurement numeric,
    hips_measurement  numeric,
    "health_goal"     healthy_goal,
    activity_index    integer         not null default 0,
    created_at        timestamp       not null default current_timestamp,
    updated_at        timestamp,
    deleted_at        timestamp
);

-- Table restaurants
create table if not exists restaurants
(
    id            bigserial primary key,
    information   text,
    certification text[]       not null,
    status restaurant_status  NOT NULL DEFAULT 'AWAITING_APPROVAL',
    phone_number  varchar(20),
    address       varchar(400) not null,
    account_id    bigint   not null unique references accounts (id),
    created_at    timestamp    not null default current_timestamp,
    updated_at    timestamp,
    deleted_at    timestamp
);

-- Table items
create table if not exists items
(
    id            bigserial primary key,
    name          varchar(255)   not null,
    ingredients   varchar(255)[] not null,
    description   text           not null,
    price         numeric        not null,
    image         text           not null,
    calo          numeric        not null,
    type          item_type      not null,
    restaurant_id bigint         not null references restaurants (id),
    created_at    timestamp      not null default current_timestamp,
    updated_at    timestamp,
    deleted_at    timestamp
);

-- Table reviews
create table if not exists reviews
(
    id         bigserial primary key,
    item_id    bigint    not null references items (id),
    account_id bigint    not null references accounts (id),
    comment    text,
    evaluate   smallint  not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp,
    deleted_at timestamp
);

-- Table orders
create table if not exists orders
(
    id          bigserial primary key,
    account_id  bigint    not null references accounts (id),
    total_price numeric   not null default 0,
    created_at  timestamp not null default current_timestamp,
    updated_at  timestamp,
    deleted_at  timestamp
);

-- Table order_details
create table if not exists order_details
(
    id         bigserial primary key,
    order_id   bigint    not null references orders (id),
    item_id    bigint    not null references items (id),
    amount     integer   not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp,
    deleted_at timestamp
);

-- Table shopping_carts
create table if not exists shopping_carts
(
    id         bigserial primary key,
    account_id bigint              not null references accounts (id),
    item_id    bigint              not null references items (id),
    amount     integer             not null,
    state      shopping_cart_state not null default 'UNPAID'::shopping_cart_state,
    created_at timestamp           not null default current_timestamp,
    updated_at timestamp,
    deleted_at timestamp
);