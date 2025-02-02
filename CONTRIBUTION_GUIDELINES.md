# Contribution Guidelines

To maintain a clear and structured project history, please follow these commit types when contributing:

## Commit Message Format
Each commit message should follow this format:

```bash
<type>(<scope>): <short description>

<optional longer description>
```

- **`type`** → Specifies the type of change (see list below).

- **`scope`** (optional) → Affected module or feature (e.g., `auth`, `dashboard`).

- **`short description`** → Briefly explains the change (max 50 chars).

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

By following these guidelines, we ensure better collaboration and maintain a clean commit history. 