CREATE TABLE followed_users
(
    followed SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES integral_user(user_id) ON UPDATE CASCADE,
    followed_user INTEGER REFERENCES integral_user(user_id) ON UPDATE CASCADE,
    date_create DATE NOT NULL DEFAULT CURRENT_DATE
)