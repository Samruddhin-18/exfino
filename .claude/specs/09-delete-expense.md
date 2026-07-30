# Spec: Delete Expense

## Overview
Step 9 replaces the placeholder `GET /expenses/<id>/delete` route with a real
feature that lets a logged-in user permanently delete an expense they own.
It adds a confirmation step so deletions aren't triggered by a single
accidental click or a stray GET request, and writes the removal via a
`DELETE` query in `database/queries.py`. Once complete, deleted expenses
disappear immediately from the profile page's transaction list, summary
stats, and category breakdown.

## Depends on
- Step 1: Database setup (`expenses` table and `get_db()` exist)
- Step 3: Login / Logout (`session["user_id"]` is set on login)
- Step 5: Backend connection (`database/queries.py` pattern established)
- Step 8: Edit Expense (`get_expense_by_id`, ownership-check pattern, and
  `txn.id` already wired into `profile.html`'s transaction rows)

## Routes
- `GET /expenses/<int:id>/delete` — render a confirmation page showing the
  expense's details and a "confirm delete" form — logged-in only, owner only
- `POST /expenses/<int:id>/delete` — delete the expense and redirect to
  `/profile` — logged-in only, owner only

Both methods are handled by the same `delete_expense(id)` view, replacing
the current placeholder. If the expense does not exist, or exists but
belongs to a different user, respond with a 404. The actual deletion must
only happen on `POST` — a `GET` must never mutate data.

## Database changes
No new tables or columns.

## Templates
- **Create:** `templates/delete_expense.html` — shows the expense's date,
  category, amount, and description, with a form (`method="post"`) whose
  submit button confirms the delete, plus a link/button back to `/profile`
  to cancel. Extends `base.html`.
- **Modify:** `templates/profile.html` — add a delete link/button next to
  the existing `Edit` link in each transaction row, pointing to
  `{{ url_for('delete_expense', id=txn.id) }}`.

## Files to change
- `app.py` — replace the placeholder `delete_expense(id)` view with a real
  `GET`/`POST` implementation
- `database/queries.py` — add `delete_expense(id, user_id)`
- `templates/profile.html` — add a delete link per transaction row

## Files to create
- `templates/delete_expense.html` — the delete confirmation page

## New dependencies
No new dependencies.

## Rules for implementation
- No SQLAlchemy or ORMs — raw `sqlite3` only via `get_db()`
- Parameterised queries only — never string-format values into SQL
- Passwords hashed with werkzeug (not applicable to this feature, but no
  regressions to existing auth routes)
- Use CSS variables — never hardcode hex values
- All templates extend `base.html`
- No inline styles
- `delete_expense(id, user_id)` in `database/queries.py` must include
  `WHERE id = ? AND user_id = ?` so a user can never delete another user's
  expense even via a crafted request
- Reuse `get_expense_by_id(id, user_id)` (from Step 8) to look up the
  expense and enforce ownership before rendering the confirmation page
- If the expense is missing or not owned by the current user, return a 404
  (e.g. via `abort(404)`), not a redirect that leaks whether the id exists
- Deletion must only be performed on `POST`; the `GET` handler only renders
  the confirmation page and must not modify the database
- On success, redirect to `/profile`

## Definition of done
- [ ] Visiting `/expenses/<id>/delete` while logged out redirects to `/login`
- [ ] Visiting `/expenses/<id>/delete` for an expense owned by another user
      returns a 404
- [ ] Visiting `/expenses/<id>/delete` for a non-existent id returns a 404
- [ ] Visiting `/expenses/<id>/delete` (GET) for your own expense shows a
      confirmation page with the expense's details and does not delete it
- [ ] Submitting the confirmation form (POST) deletes the row from
      `expenses` and redirects to `/profile`, where the transaction list,
      summary stats, and category breakdown no longer include it
- [ ] Submitting a POST to `/expenses/<id>/delete` for an expense owned by
      another user returns a 404 and does not delete the row
- [ ] The profile page's transaction rows each have a delete link/button
      alongside the existing edit link
