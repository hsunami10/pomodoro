DROP TABLE IF EXISTS Account;

CREATE TABLE Account (
  id             INT          NOT NULL PRIMARY KEY,
  username       VARCHAR(50)  NOT NULL,
  password       VARCHAR(50)  NOT NULL
);

INSERT INTO Account VALUES
  (1, 'hsunami', 'hsunami password'),
  (2, 'boop', 'bam'),
  (3, 'foo', 'barpassword');