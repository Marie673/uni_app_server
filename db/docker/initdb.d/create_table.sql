CREATE TABLE IF NOT EXISTS 'testdb'.'user' (
    'uuid' INT NOT NULL COMMENT '学籍番号',
    'user_name' VARCHAR(45) NOT NULL COMMENT 'ユーザー名',
    'password' VARCHAR(45) NOT NULL COMMENT 'パスワード',
    PRIMARY KEY ('uuid')
)
ENGINE = InnoDB;