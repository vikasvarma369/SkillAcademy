# Contribution Guidelines

To maintain a clear and structured project history, please follow these guidelines when contributing:

## Steps to Contribute

1. **Fork** the repository.

2. **Create a new branch**:
    ```bash
    git checkout -b <branch-name>
    ```
3. **Make your changes** and commit them:
    ```bash
    git commit -m "Description of changes"
    ```
4. **Push** to the branch:
    ```bash
    git push origin <branch-name>
    ```
5. Open a **pull request**.

## Commit Message Format

Each commit message should follow this format:

```bash
<type>(<scope>): <short description>

<optional longer description>
``` 


## Commit Types

| Type        | Purpose                                      |
|------------|----------------------------------------------|
| **`feat`**    | Introduces a new feature                     |
| **`fix`**     | Fixes a bug or issue                        |
| **`docs`**    | Updates or improves documentation           |
| **`style`**   | Code formatting, no logic changes           |
| **`refactor`** | Improves code structure without changing behavior |
| **`test`**    | Adds or updates tests                      |
| **`chore`**   | Maintenance tasks (e.g., updating dependencies) |

## Branch Naming Convention
Branch names should be descriptive and follow this format:

```bash
<type>/<short-feature-description>
```

**Examples:**
- `feat/add-user-authentication`

- `fix/fix-login-validation`

- `docs/update-readme`
