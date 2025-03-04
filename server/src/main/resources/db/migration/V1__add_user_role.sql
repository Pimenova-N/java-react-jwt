INSERT INTO users VALUES (1, 'mike@gmail.com', '$2a$10$4mJh1zUrU38tcrwBTcZceOhz5Kt/wdulLWa6J3KTAg1Yitk5/qmGC', 'mike');
INSERT INTO roles VALUES (1, 'ROLE_USER');
INSERT INTO user_roles VALUES(1, 1);

SELECT setval('users_id_seq', 1);