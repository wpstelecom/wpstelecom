---
description: Detecta a linguagem (Python/Node/PHP/HTML), roda linters, remove logs de debug e sugere um commit semântico.
---

# Smart Quality Check & Commit

This workflow acts as a senior engineer reviewing code before a commit. It ensures quality standards for both Python and Node.js environments.

## Prerequesites
- The agent must have permission to run terminal commands.
- The agent must have permission to read/write files.

## Workflow Steps

1. **Context Detection (The Scout)**
   - Run `git status` to identify modified files.
   - **Check Environment**:
     - If `package.json` exists, treat as **Node.js**.
     - If `requirements.txt`, `pyproject.toml`, or `*.py` files exist, treat as **Python**.
   - *Constraint*: If both exist, check which file types were modified in `git status`.

2. **Code Cleanup (The Scrub)**
   - **For Python Files**:
     - Check for `print()` statements used for debugging. Remove them.
     - Look for formatters (`black`, `ruff`, `autopep8`) in the environment. Run them on modified files if found.
   - **For Node.js Files**:
     - Check for `console.log()` or `debugger` statements. Remove them.
     - Check `package.json` for a `lint` or `format` script. Run `npm run lint --if-present`.

3. **Staging (The Split)**
   - Run `git diff` to review the final clean code.
   - Stage the changes using `git add <files>`.

4. **Commit Generation (The Lift-off)**
   - Generate a commit message following **Conventional Commits** standards.
   - **Format**: `<type>(<scope>): <description>`
     - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
   - **Language**: The commit message description must be in **Portuguese** (pt-BR).
   - **Example**: `feat(auth): adiciona validação de token JWT`

5. **Final Confirmation**
   - Present the cleaned diff summary and the suggested commit message to the user.
   - Ask: "Deseja realizar o commit com esta mensagem?"
   - If approved, run `git commit -m "..."`.