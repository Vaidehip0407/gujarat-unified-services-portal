#!/bin/bash

# Commit current changes to GitHub
echo "🔄 Committing current changes to GitHub..."

# Add all changes
git add -A

# Commit with descriptive message
git commit -m "Fix NewConnectionForm import error and prepare localhost development

- Fixed NewConnectionForm import in App.jsx
- Complete RPA automation setup for Torrent Power
- All suppliers redirect to official websites
- Ready for localhost testing before EC2 deployment
- Enhanced error handling for 'enddate' property errors"

# Push to GitHub
git push origin main

echo "✅ Changes committed and pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Start backend: cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Test RPA automation on localhost"