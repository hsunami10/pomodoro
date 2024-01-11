# Pomodoro Backend

## Setup

### iTermocil

Add this code snippet to the windows array:

```yaml
  - name: Backend Dev
    root: ~/Documents/GitHub/pomodoro/backend
    panes:
      - cd ~/Documents/GitHub/pomodoro/backend && ./mvnw spring-boot:run
```

### Enable Hot-Reloading

[Via this article](https://dev.to/imanuel/auto-reload-springboot-in-intellij-idea-1l65)

#### 1) Add `spring-dev-tools` dependency

Add the code below to the pom.xml file &#8594; `<dependencies>`:

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-devtools</artifactId>
	<scope>runtime</scope>
  <optional>true</optional>
</dependency>
```

#### 2) Enable the `Build Project Automatically` option in settings

Go to settings

- Click IntelliJ Menu → Preferences or
- Cmd/Ctrl + ,

→ dropdown arrow next to **Build, Execution, Deployment** → **Compiler** → **Build Project Automatically**

#### 3) Enable `compiler.automake.allow.when.app.running` option in the Registry

- Double tap shift
- Type "registry" and open up registry settings
- Find the **compiler.automake.allow.when.app.running** settings and check it.

If the option is not there, then you can skip this step.

#### 4) Restart your Spring Boot application

- In terminal, Ctrl + C to exit out of the application
- Run this command `./mvnw spring-boot:run`

Now any changes you make in the source code should reflect automatically! It's not instant though, so give it a few seconds to rebuild the application.

## Troubleshooting

If you get a bunch of errors with the Build → Sync window below: `Unresolved plugin: ...`

Try to invalidate caches:

1. In the upper menu bar (next to "Edit"), click **File** → **Invalidate Caches**
2. Click **Invalidate and Restart**.

Sources:

- https://stackoverflow.com/questions/20496239/maven-plugins-can-not-be-found-in-intellij
- https://stackoverflow.com/questions/38957963/unresolved-plugin-org-apache-maven-pluginsmaven-jar-plugin2-4

## Tips & Trips

### Keyboard Shortcuts

- `Shift` + `Shift` – open search menu
- `Ctrl/Cmd` + `,` – open settings menu