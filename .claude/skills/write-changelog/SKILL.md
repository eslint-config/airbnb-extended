---
name: write-changelog
description: Write the next CHANGELOG.md section from the commits and diffs since the last release. Use before opening a release PR, or when asked to "write the changelog" or "prepare release notes".
---

# Write the changelog

The release workflow copies the matching `## x.y.z` section of `CHANGELOG.md` into the GitHub Release. Write it by hand, in the project's format, before the release PR is merged.

## 1. Find the range

- Version: read it from `packages/eslint-config-airbnb-extended/package.json`. If it was not bumped yet, ask the user which version to use.
- Last release: the first `## x.y.z` heading below the top of `CHANGELOG.md`.
- Last tag: use `V<x.y.z>` if it exists. Otherwise use `eslint-config-airbnb-extended@<x.y.z>`. Check with `git tag --sort=-creatordate`.
- Date: today, as `YYYY-MM-DD`.

## 2. Read what changed

```bash
git log --no-merges --format='%h %an %s' <last-tag>..HEAD
git diff --stat <last-tag>..HEAD -- . ':!pnpm-lock.yaml'
```

Read the real diffs for `rules/`, `configs/`, `extensions/`, `helpers/`, `index.ts`, `packages/create-airbnb-x-config/`, and `apps/build-templates/lib/`. Do not guess from commit titles.

Skip noise: merge commits, formatting, lockfile only changes, internal CI and AI tooling files.

## 3. Sort the changes

| Heading                   | Put here                                                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `### 🚨 Breaking Changes` | A rule turned on as `error`. A rule changed to a stricter value. Removed or renamed public exports. Dropped Node/ESLint versions. A new CLI flag value that changes defaults. |
| `### 🚀 Features`         | New rules that are `warn` or `off`. New helpers, options, CLI flags, supported plugins or runtimes, docs features.                                                            |
| `### 🩹 Fixes`            | Bug fixes, dependency updates, docs fixes, internal improvements users may notice.                                                                                            |
| `### ❤️ Thank You`        | Outside contributors only, as `- Name @github-username`. Never list the maintainer. Skip the section if there are none.                                                       |

Leave out any heading that has no items. Keep the order above.

Legacy config values never change (see CLAUDE.md), so a legacy change is always a bug fix or breaking change. Flag it to the user.

## 4. Write the lines

- One line per change, starting with `- `.
- Prefix a line with `**<package-name>:**` when it touches one package, for example `**eslint-config-airbnb-extended:**` or `**create-airbnb-x-config:**`. No prefix when it covers the whole repo.
- Name rules in backticks with their full id, for example `n/prefer-import/assert-strict`, and state the severity, for example "with `error` severity".
- For a breaking change, say what users must do.
- Reference issues as `#123`. Find them in commit messages and PR titles.
- Plain, simple English. Short sentences. No marketing words.

## 5. Insert it

Add the new section at the top of `CHANGELOG.md`, above the previous version, with a blank line between sections:

```md
## 3.3.0 (2026-10-03)

### 🚨 Breaking Changes

- **eslint-config-airbnb-extended:** Introduced the `n/prefer-import/assert-strict` rule with `error` severity, `node:assert` must now be replaced by `node:assert/strict`
```

Do not add `---` or a "Full Changelog" link. The release workflow adds them.

## 6. Finish

- Run `pnpm format` so the file passes Prettier.
- Show the new section to the user and point out anything you were unsure about, such as a guessed severity, a missing contributor, or a possible breaking change.
- Do not commit, tag, or publish.
