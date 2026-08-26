# Massive Empire Fantasy Football — Subpage Outline

A proposed page for each of the 12 tools currently listed on the hub page (`massiveempirefantasyfootball.html`). Nothing here is built yet — this is the plan to review first.

## Shared approach

- **New URL pattern:** `massive-empire/<slug>.html` (e.g. `massive-empire/draft-command.html`), linked from each tool's list item on the hub page ("Learn more →").
- **Shared template:** dark navy/black background, orange + cool-blue holographic accent (matching the existing "Flagship Feature" section already on the hub page), using the same `.kicker` / `.headline` / `.lede` / `.scenario` building blocks already in the CSS — so these feel like a natural extension of the site, not a new design system.
- **Every subpage ends** with the same "Request an invitation" CTA the hub page already uses.
- **Mock Draft Simulator is the one exception** — per your note, that page should visually resemble an actual draft board (team columns, a live pick grid, a "you're on the clock" highlight) rather than the kicker/headline text template. More of a UI mockup than a marketing page.
- **Draft Command is the deep-dive page** — it already has the most content (the "Stop ranking players," "Five names. One command," odds cards, compare cards, and "Two modes" sections currently living on the hub page). Plan is to move all of that onto its own page, and add a new **"Install the Extension"** section: become an *Imperial Commander*, with the extension overlaying live recommendations directly on top of your draft room (ESPN/Yahoo/Sleeper, etc.). The hub page keeps a short teaser + link instead of the full breakdown.

Build order, once you sign off: Draft Command and Mock Draft Simulator first (most content already exists / most visually distinct), then the rest in two batches of five.

---

## Draft-Season Tools

**1. Holotable Mock Draft Simulator** — `massive-empire/mock-draft-simulator.html`
Tagline: *Run practice drafts against your league's real tendencies before it counts.*
- Draft-board-style UI mockup: team columns, live pick feed, "on the clock" state
- What makes it different from a generic mock draft site — it's trained on *your* league's actual draft history and tendencies
- How many mocks / rounds you can run
- CTA: request an invitation

**2. Imperial Draft Command** — `massive-empire/draft-command.html`
Tagline: *Stop ranking players. Start commanding your draft.*
- Full deep-dive content migrated from the hub page (scenario walkthrough, Command Pick odds cards, positional-scarcity compare cards, Commander/Strategist modes)
- New: **Install the Extension** — become an Imperial Commander; the extension overlays live Command Picks directly on your platform's draft room
- CTA: request an invitation

**3. Live Draft Surveillance** — `massive-empire/live-draft-surveillance.html`
Tagline: *Every pick across the room, tracked and reflected on your board instantly.*
- How it syncs to the live draft room in real time
- Alerts when a target player gets taken ("sniped")
- How this feeds Draft Command's recalculation

**4. Market Value Index** — `massive-empire/market-value-index.html`
Tagline: *See where the league is actually drafting a player, not just where he's ranked.*
- Crowd ADP vs. your league's real draft behavior
- The value-over-ranking gap, explained with an example
- How to use it to find value picks late

**5. Casualty Forecast** — `massive-empire/casualty-forecast.html`
Tagline: *Injury-risk modeling on every player you're considering.*
- What feeds the risk score (workload trends, injury history)
- How to read a risk grade
- Using it to hedge a pick, not just avoid one

**6. Bloodline Report** — `massive-empire/bloodline-report.html`
Tagline: *A first-year player model built for rookies and post-hype sleepers.*
- How rookies are graded with no NFL track record yet
- The "bloodline" comp-player concept (statistical lineage to past players)
- Where post-hype sleepers fit in

---

## In-Season Tools

**7. Waiver Wire Bounty Board** — `massive-empire/waiver-wire-bounty-board.html`
Tagline: *Surfaces the best add on the wire before the rest of your league notices.*
- How the bounty ranking works and how often it refreshes
- Claim-priority strategy tips

**8. Trade Tribunal** — `massive-empire/trade-tribunal.html`
Tagline: *Scores every trade offer and tells you, plainly, who won it.*
- How the grading engine factors positional need + value
- A worked example verdict

**9. Command Bridge** — `massive-empire/command-bridge.html`
Tagline: *One screen with your full roster, matchup, and recommended lineup.*
- The at-a-glance weekly dashboard concept
- How it ties Deployment Orders and Garrison Value Ledger together in one view

**10. Deployment Orders** — `massive-empire/deployment-orders.html`
Tagline: *A weekly start/sit call for every player on your roster.*
- How the recommendation is generated and how confidence is shown
- Matchup-based reasoning displayed alongside each call

**11. League Surveillance Grid** — `massive-empire/league-surveillance-grid.html`
Tagline: *A standing scouting report on every other team in your league.*
- Opponent roster-strength breakdown
- Tendency tracking (who overreacts to bye weeks, who hoards RBs, etc.)

**12. Garrison Value Ledger** — `massive-empire/garrison-value-ledger.html`
Tagline: *Current trade value on every rosterable player, updated weekly.*
- The dynamic value chart concept
- How it pairs with Trade Tribunal when evaluating an offer

---

Let me know if the URL scheme, the Draft Command extension framing, or the build order needs adjusting before I start on the first batch.
