Massive Empire → massiveempire.win — Spin-off Brief (updated)
Paste this into a new chat to pick up the domain/hosting work without re-explaining context.

## What this is
Splitting the Massive Empire Fantasy Football Tool off of 5280content.com onto its own domain, massiveempire.win, as an independent site. For now this is website-only. The 5280 Content site keeps its current link to the old in-repo page until the new site is live and confirmed working — only then does the "Our Products" card on 5280content.com get pointed at massiveempire.win.

## Decisions made (resolved)
- **Domain**: massiveempire.win is already registered by Joshua at Cloudflare (confirmed — he registers all his domains there). Not repurchasing through Vercel.
- **DNS approach**: keep DNS at Cloudflare (consistent with his standing "all domains live at Cloudflare" setup) rather than migrating nameservers to Vercel. Add the A/CNAME records Vercel's domain wizard gives us directly in the Cloudflare DNS tab for massiveempire.win. (Alternative, not chosen: switch nameservers to Vercel for full consolidation — leave this as an option if he ever wants it.)
- **Vercel project**: reuse the existing (already-created, currently unlinked) Vercel project `massive-empire-fantasy-football` (id `prj_7L9r3NYTiif5GfwEZEhDis4OJVpA`) rather than creating a new one. It currently serves an old manual deployment (a portfolio page at root, old fantasy-football.html) — that gets replaced once the new repo is linked and pushed.
- **Repo structure**: brand-new standalone GitHub repo, `massiveempire-win`, under joshuamassey-beep.
- **Sender email**: use a new on-brand address, e.g. `hello@massiveempire.win`, via Resend. Cost check: Resend's free plan includes 3 verified sending domains at no charge (3,000 emails/mo, 100/day) — adding massiveempire.win as a second verified domain alongside 5280content.com is free, no upgrade needed. Just needs its own DKIM/SPF/DMARC records added at Cloudflare, same process as was done for 5280content.com.
- **Resend API key**: Resend API keys are account-level, not domain-scoped — the same RESEND_API_KEY already used in the 5280content Vercel project can likely be reused here rather than generating a new one (confirm the key isn't restricted to a specific domain/project when copying it over).

## Still open
- Favicon/branding: the page currently inherits a placeholder inline favicon. Worth designing something empire-themed now that it's a standalone site.

## Files in this folder
- `index.html` — full Massive Empire landing + invite-form page. Back-link points to absolute `https://5280content.com/`.
- `api/submit.js` — serverless function for invite-form submissions (plain `fetch` to Resend's API, no npm dependency, no package.json needed).
- `assets/darth-jos.jpg` — image used in the post-submit popup.
- `ME_Fantasy Football Command Bridge.png` — reference image added since the original brief.
- `docs/massive-empire-subpages-outline.md` — 12-page subpage outline for future growth.
- `docs/video-and-graphics-prompts.md` — AI image/video generation prompts for Massive Empire.

## Remaining steps, in order

1. **Clean up stray `.git-broken` folder** — an earlier automated attempt to git-init this folder from the cloud sandbox hit a permissions wall (the sandbox can't delete files inside your connected folder) and left behind a `.git-broken` directory here. Delete it — `rm -rf ".git-broken"` in Terminal, or drag it to Trash in Finder. Harmless, just needs cleanup.

2. **Create the GitHub repo** (you already have github.com/new open in Chrome):
   - Repository name: `massiveempire-win`
   - Visibility: your call (private recommended, matches most of your other repos)
   - Do NOT initialize with a README, .gitignore, or license (we're pushing existing files)
   - Click "Create repository"

3. **Push this folder from Terminal** (on your Mac, not the cloud sandbox — this needs your real git credentials):
   ```
   cd "/Users/joshuamassey/Documents/5280 Content/MassiveEmpire.win"
   git init -b main
   git add -A
   git commit -m "Initial commit: Massive Empire spin-off site"
   ```
   Then copy the exact remote-add + push commands GitHub shows on the new repo's page under "…or push an existing repository from the command line" — that'll match however your machine is set up to authenticate (SSH vs HTTPS) — and run those.

4. **Link the Vercel project to the new repo**: in the Vercel dashboard, open project `massive-empire-fantasy-football` → Settings → Git → Connect Git Repository → select `joshuamassey-beep/massiveempire-win`. This replaces the old manual deployment with deploys-on-push from the new repo.

5. **Set environment variables** on that Vercel project (Settings → Environment Variables):
   - `RESEND_API_KEY` — reuse the value from the 5280content Vercel project
   - `FROM_EMAIL` — `hello@massiveempire.win` (won't work until step 6 is done; fine to set now)
   - `OWNER_EMAIL` — optional, code already falls back to `joshuamassey@me.com`

6. **Verify the sending domain in Resend**: Resend dashboard → Domains → Add Domain → `massiveempire.win` → it'll generate DKIM/SPF/DMARC DNS records → add those in Cloudflare's DNS tab for massiveempire.win (same steps as were done for 5280content.com).

7. **Point the domain at Vercel**: in the Vercel project → Settings → Domains → Add → `massiveempire.win` → Vercel will show the A/CNAME records to add → add those in Cloudflare's DNS tab too.

8. **Verify it's live**: visit massiveempire.win, confirm the invite form and email flow work end to end.

## Deferred — do not do yet
Per Joshua's note: hold off updating the 5280content.com "Our Products" card link until massiveempire.win is confirmed live and working. That's a one-line change (swap the card's `href`) whenever ready.
