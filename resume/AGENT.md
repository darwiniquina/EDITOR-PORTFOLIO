# Resume agent instructions

Goal: produce a one-page, ATS-friendly resume tailored to one job post.

Inputs: `MASTER.yml` (facts), `TEMPLATE.md` (layout), the job post text.

Steps:
1. Read the job post. Pick the matching tag: `short_form`, `ugc` or `talking_head`. List its top 8 to 10 keywords.
2. Take the `headline` and `summary` for that tag. Rewrite the summary in 2 to 3 plain sentences using only facts in `MASTER.yml`.
3. Experience: include roles that match the tag first. Keep bullets whose tags match, plus any that hit a job keyword. Cap 3 to 5 bullets per role. Reorder most relevant first.
4. Projects: include only entries with a matching tag.
5. Skills: use the matching group, then add other skills only if the job post asks for them and they are in `MASTER.yml`.
6. Fill `TEMPLATE.md`. Delete empty sections and any field still marked TODO. Never output the word TODO.
7. Reuse the exact wording of job keywords only when the fact is true.

Hard rules:
- Never invent clients, results, metrics, tools, dates or years of experience. Check `do_not_claim`.
- Label personal and spec work as such.
- No em dashes. Plain bullets. One column. No tables or icons.
- If a needed fact is missing, ask Darwin instead of guessing.

Output: Markdown that follows `TEMPLATE.md`, saved as `out/<company>-<role>.md`.
