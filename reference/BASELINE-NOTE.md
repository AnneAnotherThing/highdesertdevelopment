# About the git history in this package

Two commits.

1. **Baseline.** Raymond's build exactly as delivered, at GitHub HEAD 2026-08-11.
   That build is byte-identical to `Jerry updated.zip`.
2. **Hive-Rise pass.** Everything described in `CHANGELOG.md`.

`git diff HEAD~1 HEAD -- site` gives you the exact set of changes, which is the fastest way
to see what was touched and to hand any single change back to Raymond if Jerry prefers that.

`site/images/` is in `.gitignore` and is not in the history. The images are all present in the
working tree, they were just kept out of git so the package stays small. The only change made
to them was compression: 15.9 MB down to 11.0 MB with no visible quality loss, and four flyer
graphics pulled out of the photo galleries. No image was cropped, edited or replaced.

If you want the images tracked, delete the `site/images/` line from `.gitignore` and commit.
