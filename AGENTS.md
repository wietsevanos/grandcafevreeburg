<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep menu PDFs as source-controlled files in `public/menus` with stable category paths so standalone DirectAdmin exports include the documents without relying on external asset hosting.
- Store bundled site images in src/assets as WebP (lossless for logos/transparent art) and delete unused originals, because every file in the build ships to the DirectAdmin hosting.
- Keep the kerstmenu holly mark as a transparent PNG (src/assets/kerst-holly.png) and render it upright: the user supplied it as png and asked for it unrotated, so don't convert it to WebP or apply transforms.
- "Vieren & zakelijk" requests go through the `request-form` edge function, which stores each submission in `public.aanvragen` and emails the owner via the Resend connector gateway; never replace this with client-only state — a submission must always land in the database and the owner's inbox.
- Reservations use the TheFork widget (src/components/thefork-widget.tsx); any button with class `reserve-cta` opens it, so there is one booking system and new buttons need no extra wiring.
- Photos are served as responsive WebP variants in src/assets/img (<name>-<width>.webp) via src/lib/responsive-images.ts with srcset/sizes; original CDN pointers live in design-sources/originals so they are not shipped in dist. Regenerate variants from the originals, never from an existing variant.
- Heavy or rarely used code (database client, agenda admin, TheFork iframe) loads on demand so it never delays the first paint.
