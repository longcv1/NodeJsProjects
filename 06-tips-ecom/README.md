# TipsJS - eCommerce Project
1. Connection to MongoDB
2. Create env
3. Implement feature signup
4. Implement feature "Login"
5. Implement feature "Logout"
6. Implement refresh token and security
7. Section 12: Create schema product ecommerce (using Polymorphic pattern)
8. Section 13: Api Product use Factory Pattern
9. Section 14: Api service Product advance
10. Section 15: Service Product using Factory and Stategy (bonus)
11. Section 16: Add some functions isDraft, isPublish, unPublish, edit Product Service schema
12. Section 17: Add findAll, findOne in Product Service
13. Section 18: Update product with patch method in Product Service
14. Section 19: Inventories Model and Services
15. Section 20: Discount model
16. Section 21: Discount services - part 1
17. Section 22: Discount services - part 2
18. Section 23: Cart service - part 1
19. Section 24: Cart service - part 2
20. Section 25: Order service - part 1
21. Section 26: Order service - part 2
22. Section 38: Nested comments - part 1
23. Section 39: Nested comments - part 2
24. Section 42: Notifications

# MySQL: Index va nhung sai lam nen tranh
Example:
CREATE TABLE `users` (
    `usr_id` int NOT NULL AUTO_INCREMENT,
    `usr_age` int DEFAULT '0',
    `usr_status` int DEFAULT '0',
    `usr_name` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL,
    `usr_email` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL,
    `usr_address` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL,
    -- KEY INDEX
    PRIMARY KEY (`usr_id`),
    KEY `idx_email_age_name` (`usr_email`, `usr_age`, `usr_name`),
    KEY `idx_status` (`usr_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_bin;

INSERT INTO users (
    usr_id, usr_age, usr_status, usr_name, usr_email, usr_address
)
VALUES (
    1, 30, 1, 'username01', 'username01@gmail.com', 'Hanoi'
)

INSERT INTO users (
    usr_id, usr_age, usr_status, usr_name, usr_email, usr_address
)
VALUES (
    2, 31, 1, 'username02', 'username02@gmail.com', 'HCM'
)

INSERT INTO users (
    usr_id, usr_age, usr_status, usr_name, usr_email, usr_address
)
VALUES (
    3, 32, 0, 'username03', 'username03@gmail.com', 'Hue'
)

--3 statements as below act as the same result
select * from users where usr_email='username01@gmail.com';
select * from users where usr_email='username01@gmail.com' AND usr_name=30;
select * from users where usr_email='username01@gmail.com' AND usr_name=30 AND usr_name='username01';

-- Rule 01: Truong chi muc dau tien ngoai cung ben trai, mien la truong do ton tai thi mysql co the danh dc index
-- nguoc lai, neu trong cau truy van sql ko co truong ngoai cung ben trai do, ket qua truy van se ko con chinh xac
Example:
select * from users where usr_name=30;
select * from users where usr_name=30 AND usr_name='username01';

-- Rule 02: Khong su dung SELECT * trong truy van
-- Rule 03: Khong su dung tinh toan tren cac index trong truy van (primary key, index)
-- Rule 04: su dung % ben trai khi truy van voi toan tu LIKE nhu: "username01%" de ko bi mat index trong khi truy van
-- Rule 05: neu su dung 1 truong nao do khong dc danh chi muc, thi truy van voi toan tu OR se bi mat index
-- Example: SELECT * FROM users WHERE usr_id=1 OR usr_status=0 OR usr_address='Danang' => mat index
