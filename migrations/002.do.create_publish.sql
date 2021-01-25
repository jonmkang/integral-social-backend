CREATE TABLE publish
(
    publish_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES integral_user(user_id) ON UPDATE CASCADE,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE
)