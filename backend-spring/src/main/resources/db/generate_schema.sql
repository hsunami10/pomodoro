/*//////////////////////////////
//////////// ENUMS ////////////
//////////////////////////////*/

CREATE TYPE habit_goal AS ENUM (
  'break',
  'keep',
  'new'
);

CREATE TYPE frequency_type AS ENUM (
  'daily',
  'weekly',
  'monthly',
  'yearly'
);

CREATE TYPE reflection_type AS ENUM (
  'mood',
  'difficulty',
  'motivation',
  'energy'
);

/*//////////////////////////////
//////////// TABLES ////////////
//////////////////////////////*/

CREATE TABLE account (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  username text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT (now()),
  deleted_at timestamptz
);

CREATE TABLE habit (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  account_id int REFERENCES account (id),
  name text NOT NULL,
  goal habit_goal NOT NULL,
  color varchar(7) NOT NULL,
  start_date date,
  end_date date,
  frequency frequency_type NOT NULL,
  interval smallint NOT NULL DEFAULT 1,
  days_of_week varchar(27),
  days_of_month varchar(92),
  week_of_month smallint,
  months_of_year varchar(47),
  motivation_message text,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz,
  deleted_at timestamptz
);

CREATE TABLE reflection (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  habit_id int NOT NULL REFERENCES habit (id),
  type reflection_type NOT NULL,
  rating int,
  created_at timestamptz NOT NULL DEFAULT (now()),
  deleted_at timestamptz
);

/*//////////////////////////////
/////////// COMMENTS ///////////
//////////////////////////////*/

COMMENT ON COLUMN account.id IS 'recommended to not use serial: https://stackoverflow.com/q/64016778/9477827';

COMMENT ON COLUMN habit.account_id IS 'A nullable account_id means it is not linked to an account - so it is a "preset" habit.

Preset habits are created by devs and cannot be changed by users.
- habits with a non-null `account_id` are created by users
- habits with a null `account_id` are "preset" habits that users can choose from';

COMMENT ON TABLE habit IS '
Below is a table showing relationships between `frequency` and `interval` columns:
| Description                    | `frequency`      | `interval` |
| ------------------------------ | ---------------- | ---------- |
| every day (every "1" day)      | daily            | 1          |
| every other day (every 2 days) | daily            | 2          |
| every week                     | weekly           | 1          |
| every 2 weeks                  | weekly           | 2          |
| every month                    | monthly          | 1          |

There are 4 frequencies - daily, weekly, monthly, yearly. Each have different options available:
- daily (1 choice) → interval only
- weekly (1 choices)
  - day(s) of the week
  - interval
- monthly (2 choices)
  - choice #1
    - day(s) of the month
    - interval
  - choice #2
    - 1st,2nd,3rd,4th,5th,last
    - day (singular) of the week,day,weekday,weekend day
    - interval
- yearly ()
  - choice #1
    - month(s) of the year (default: day it"s created)';

COMMENT ON COLUMN habit.interval IS 'The interval between the habit instances.';

COMMENT ON COLUMN habit.days_of_week IS '3-character strings, separated by commas.
Examples:
- weekends - `sat,sun`
- monday, wednesday, friday - `mon,wed,fri`

The max length would be every day of the week:
- each day is 3 characters long
- 7 days a week
- one semi-colon in between each (6 total)
So... `(3 * 7) + 6 = 27`.';

COMMENT ON COLUMN habit.days_of_month IS '2-character numbers, separated by commas.
Examples:
- 1st of the month - `01`
- 1st, 7th, 14th, 21st - `01,07,14,21`

The max length would be every day of the month:
- each day is 2 characters long
- max 31 days in a month
- one semi-colon in between each (30 total)
So... `(2 * 31) + 30 = 92`';

COMMENT ON COLUMN habit.months_of_year IS '3-character strings, separated by commas.
Examples:
- april - `apr`
- (Q1-Q4) january, april, july, october - `jan,apr,jul,oct`

The max length would be every month of the year:
- each month is 3 characters long
- max 12 months in a year
- one semi-colon in between each (11 total)
So... `(3 * 12) + 11 = 47`';

COMMENT ON COLUMN reflection.rating IS 'ranging from 1 to 5 (inclusive)';
