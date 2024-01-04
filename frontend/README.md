# Frontend

This project is created from Vite: `npm create vite@latest` - typescript-swc React project.

## Setup

To run the development server, run: `npm run dev` and go to whatever the terminal says "Local" is (ex. `http://localhost:5173/`)

### Install brew packages

_TODO: Set up with Docker_

```bash
brew install postgresql git node nvm emacs
```

### Install [iTermocil](https://github.com/TomAnthony/itermocil)

```bash
brew install TomAnthony/brews/itermocil
mkdir ~/.itermocil
touch ~/.itermocil/pomodoro.yml
itermocil --edit pomodoro
```

In `~/.itermocil/pomodoro.yml`:

```yaml
windows:
  - name: Root
    root: ~/Documents/GitHub/pomodoro
    panes:
      - cd ~/Documents/GitHub/pomodoro
  - name: Frontend Dev
    root: ~/Documents/GitHub/pomodoro/frontend
    layout: main-vertical
    panes:
      - commands:
          - cd ~/Documents/GitHub/pomodoro/frontend
        focus: true
      - npm run dev
      - npx tsc --watch
```

Then run:

```bash
itermocil pomodoro
```

#### Troubleshooting

If you encounter the below error:

```bash
Error: Invalid formula: /usr/local/Homebrew/Library/Taps/tomanthony/homebrew-brews/Formula/squid.rb
squid: Calling `sha256 "digest" => :tag` in a bottle block is disabled! Use `brew style --fix` on the formula to update the style or use `sha256 tag: "digest"` instead.
Please report this issue to the tomanthony/brews tap (not Homebrew/brew or Homebrew/core), or even better, submit a PR to fix it:
  /usr/local/Homebrew/Library/Taps/tomanthony/homebrew-brews/Formula/squid.rb:9

Error: Cannot tap tomanthony/brews: invalid syntax in tap!
```

[Build the formula from sources:](https://github.com/TomAnthony/itermocil/issues/117#issuecomment-874879053)

```bash
git clone git@github.com:TomAnthony/homebrew-brews.git
cd homebrew-brews/
brew style --fix Formula
brew install --build-from-source Formula/itermocil.rb
mkdir ~/.itermocil # Continue with steps from above
```

### VSCode

#### Extensions

- [Bash IDE](https://marketplace.visualstudio.com/items?itemName=mads-hartmann.bash-ide-vscode)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- [Comment Anchors](https://marketplace.visualstudio.com/items?itemName=ExodiusStudios.comment-anchors)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [Doxygen Documentation Generator](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore)
- [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ShellCheck](https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck)
- [shell-format](https://marketplace.visualstudio.com/items?itemName=foxundermoon.shell-format)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

## Initial Setup

### ESLint (v8.56.0)

Run `npm init @eslint/config`

Answers to questions:

- How would you like to use ESLint? · **To check syntax, find problems, and enforce code style**
- What type of modules does your project use? · **Javascript module (import/export)**
- Which framework does your project use? · **React**
- Does your project use TypeScript? · **Yes**
- Where does your code run? · **Browser**
- How would you like to define a style for your project? · **prompt**
- What format do you want your config file to be in? · **YAML**
- What style of indentation do you use? · **spaces**
- What quotes do you use for strings? · **single**
- What line endings do you use? · **unix**
- Do you require semicolons? · **Yes**

## Documentation

### Project Structure

src

- assets
- components
- config
- views
  - auth
  - profile
  - timer
- hooks
- routes
- stores
- test
- types
- utils

```
.
└── /src
    └── /views
        ├── /Authors
        │   ├── /AuthorsPage
        │   │   ├── AuthorsPage.js
        │   │   └── AuthorsPage.test.js
        │   └── /AuthorBlurb
        │       ├── /AuthorBlurb.js
        │       └── /AuthorBlurb.test.js
        ├── /Books
        │   ├── /BooksPage
        │   │   ├── BooksPage.js
        │   │   └── BooksPage.test.js
        │   └── /BookForm
        │       ├── /BookForm.js
        │       └── /BookForm.test.js
        └── /Login
            ├── LoginPage
            │   ├── LoginPage.styles.js
            │   ├── LoginPage.js
            │   └── LoginPage.test.js
            └── LoginForm
                ├── LoginForm.js
                └── LoginForm.test.js
```
