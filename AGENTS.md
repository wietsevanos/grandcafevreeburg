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
