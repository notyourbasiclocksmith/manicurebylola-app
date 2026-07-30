# Render restore guide — `notyourbasiclocksmith/manicurebylola-app`

_Captured 2026-07-30 before decommissioning these Render services to cut hosting spend._

This repo holds the **code**. Everything below is the Render-side configuration that does *not* live in git and would otherwise be lost. With this file you can recreate the service from scratch.

> **Secret values are intentionally NOT in this file.** Environment variable *names* are listed so you know exactly what to set; the actual values were exported to `C:\software\_render_restore_kit_20260730_062722\env\` on the owner's machine (and are also recoverable from each provider's own dashboard). Anything dormant for months should be rotated on restore anyway.

---

## Service: `manicurebylola`

- **Planned action:** SUSPEND (Tier 2)
- **Type:** `web_service`
- **Plan:** `starter`  ·  **Region:** `oregon`  ·  **Runtime:** `node`
- **Branch:** `main`
- **URL was:** https://manicurebylola.onrender.com
- **⚠️ Persistent disk:** `uploads` 1GB at `/var/data` — contents are NOT in git and NOT backed up by this file.

**Build command**
```bash
npm install && npm run build && npx prisma db push --accept-data-loss
```

**Start command**
```bash
npm run start
```

**Attached data stores**

- Postgres `manicurebylola-db` — plan `basic_256mb`, Postgres 16, disk 15GB, region `oregon`

**Environment variables (6)**

| Variable | Value |
|---|---|
| `ADMIN_PASSWORD` | 🔒 *secret — see local kit* |
| `DATABASE_URL` | 🔒 *secret — see local kit* |
| `NEXT_PUBLIC_SITE_URL` | `https://manicurebylola.onrender.com` |
| `NODE_VERSION` | `20.18.0` |
| `SESSION_SECRET` | 🔒 *secret — see local kit* |
| `UPLOAD_DIR` | `/var/data/uploads` |

---

## How to bring this back

1. Create the service on Render from this repo, matching the type, plan, region and branch above.
2. Recreate any Postgres / Key Value instance listed, at the same plan and version.
3. Set the build and start commands exactly as recorded.
4. Set every environment variable listed. Pull secret values from the local kit, or regenerate them from the provider dashboards (recommended if time has passed).
5. If a database held data you still need, restore it from the export taken at decommission time (`C:\software\_render_db_backups_20260730\`).

