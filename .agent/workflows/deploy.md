---
description: Auto-commit local changes and push to live
---
# Deploy to Live

// turbo-all
1. Stage all changes, commit them with a generic message, and push to the live server.
```bash
git add .
git commit -m "chore: auto-update from local"
git pull --rebase origin main
git push origin main
```
