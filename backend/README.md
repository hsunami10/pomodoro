# Pomodoro Backend

## Setup

### PostgreSQL Database

[PostgreSQL Cheat Sheet](https://www.postgresqltutorial.com/postgresql-cheat-sheet/)

Install PostgreSQL via Homebrew: `brew install postgresql`

#### 1) Run Postgres Database Server Locally

Here's [list of commands](https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html) to start / stop the server

```shell
# Manual start
pg_ctl -D /usr/local/var/postgres start # Start server
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start # Start server with log file

# Manual stop
pg_ctl -D /usr/local/var/postgres stop

# Auto on log-in
brew services start postgresql
brew services stop postgresql
```

So... run the "start server" command:

```
pg_ctl -D /usr/local/var/postgres start
```

Once started, check if postgres is running:

```shell
export PGDATA='/usr/local/var/postgres' # Set PGDATA env variable
pg_ctl status
```

`pg_ctl status` should print out:

```shell
pg_ctl: server is running (PID: 15460)
/usr/local/Cellar/postgresql/14.4/bin/postgres "-D" "/usr/local/var/postgres"
```

If this is a fresh installation, need to initialize the database cluster (a collection of databases managed by a single server)

```shell
initdb /usr/local/var/postgres
```

Default host: `127.0.0.1` / `localhost`, port: `5432`

#### 2) Create & Access a Database with PSQL Shell

##### Log Into PSQL Shell

Run `createdb pomodoro` in terminal (or whatever the app name is).

To access the database, you need to log into the shell. There are two ways to log in:

1. as a username "postgres" → `psql -U postgres`
2. as your local username → `psql`

Note: if you run into an error `FATAL:  database "username" does not exist`, run `createdb username` and try again.

Once you log into the shell, it should print out something like:

```
psql (14.10 (Homebrew))
Type "help" for help.

username=#
```

##### Access Database

Once you're in the psql shell, run `\c pomodoro` to connect to the database. Now you can run SQL commands straight from the command line!

#### PSQL Shell Commands

```shell
# in regular terminal
psql -U postgres # log into shell as "postgres" user
createdb db_name # create database with name "db_name"
dropdb db_name # drop database with name "db_name"

# in psql shell
\l # list all databases
\c db_name # connect to a specific database with name "db_name"
\d # list all relations (tables)
\q # exit/quit shell
```

#### 3) Install TablePlus GUI

It's a lot easier to work with a GUI rather than a shell → we use TablePlus ([download here](https://tableplus.com/)).

Once you're on the main screen, click the small `+` to add a new connection. Make sure it's on PostgreSQL and click **"Create."**

For the connection properties, here are the the values for the fields:

- Name → `pomodoro`
- Host/Socket → leave as default (`127.0.0.1`)
- Port → leave as default (`5432`)
- User, Password → leave as default
- **Database → `pomodoro` (name of database)**

Click "Test" to confirm that all the fields are correct (should all highlighted green) and click "Connect" to finish!

![Screen Shot 2024-01-22 at 3.41.18 PM](/Users/michaelhsu/Library/Application Support/typora-user-images/Screen Shot 2024-01-22 at 3.41.18 PM.png)

#### 4) Set the Timezone of Database Server

The default timezone of the server is local timezone, so you'll need to set it manually.

Do **not** use `SET TIME ZONE 'UTC'` in SQL because it only sets it for the [current user's session](https://stackoverflow.com/a/6663848/9477827), not the entire server. Instead, you need to access the `postgresql.conf` file to set it permanently.

```shell
# Log into PSQL shell as "postgres" user
psql -U postgres

# Show path to config file
show config_file
\q

# For me, it's /usr/local/var/postgres/postgresql.conf (yours could be different)
code <path_to_config_file>
```

Once you have the config file open in the editor, look up "timezone" (not "log_timezone") and change the value to `'UTC'`. It should look something like this:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

Restart the database server with the `pg_ctl` stop/start commands listed above, and you should be good!

To validate if it worked, create a user session with PSQL or TablePlus and run:

```sql
select now(); -- should have +00 offset
show time zone; -- should output 'UTC'
```

### iTermocil

Add this code snippet to `~/.itermocil/pomodoro.yml` file from the frontend setup:

```yaml
- name: Backend Dev
    root: ~/Documents/GitHub/pomodoro/backend
    layout: main-vertical
    panes:
      - commands:
          - ''
        focus: true
      - cd ~/Documents/GitHub/pomodoro/backend && uvicorn main:app --reload
```

### PyCharm

1. Install PyCharm Community Edition (free) from [here](https://www.jetbrains.com/pycharm/download/?section=mac).
2. Run `pip install -r requirements.txt`

| Keyboard Shortcut | Function           |
| ----------------- | ------------------ |
| `Shift` + `Shift` | open search menu   |
| `Ctrl/Cmd` + `,`  | open settings menu |

## PostgreSQL Database Diagram

https://dbdiagram.io/d/pomodoro-65b18287ac844320aea892ac

## Troubleshooting

**Package requirements '...' are not satisfied**

Try to invalidate caches:

1. In the upper menu bar (next to "Edit"), click **File** → **Invalidate Caches**
2. Click **Invalidate and Restart**.

[Source](https://stackoverflow.com/a/55341896/9477827)

## Learning Resources

### PostgreSQL

- [Use timestamptz (timestamp with time zone)](https://stackoverflow.com/a/17562423/9477827)
- [Enum type alternatives and comparisons](https://medium.com/swlh/postgresql-3-ways-to-replace-enum-305861e089bc)
- [Use identity column instead of serial type](https://stackoverflow.com/a/9875517/9477827)
