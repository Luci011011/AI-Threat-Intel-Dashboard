# GitHub Setup Guide

This guide will help you prepare and publish this project to GitHub.

## Pre-Publication Checklist

Before pushing to GitHub, make sure to:

1. **Update Repository URL**
   - Edit `package.json` and update the `repository.url` field with your GitHub repository URL
   - Example: `"url": "https://github.com/yourusername/ai-threat-intel-dashboard.git"`

2. **Update README**
   - Replace placeholder repository URLs in README.md
   - Update the clone command with your repository URL
   - Add your contact information if desired

3. **Update Security Contact**
   - Edit `SECURITY.md` and update the email address for security reports

4. **Review License**
   - The project uses MIT License (see LICENSE file)
   - Update copyright year if needed

5. **Remove Sensitive Data**
   - Ensure no API keys or secrets are committed
   - Check `.gitignore` is properly configured
   - Review all files for any sensitive information

## Initial Git Setup

If you haven't initialized git yet:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AI Threat Intelligence Dashboard"

# Add your GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/ai-threat-intel-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## GitHub Repository Settings

After creating your repository on GitHub:

1. **Enable GitHub Actions**
   - Go to Settings > Actions > General
   - Enable "Allow all actions and reusable workflows"

2. **Set Default Branch**
   - Go to Settings > Branches
   - Set default branch to `main` or `master`

3. **Add Repository Topics** (optional)
   - Go to repository main page
   - Click the gear icon next to "About"
   - Add topics: `cybersecurity`, `threat-intelligence`, `react`, `typescript`, `dashboard`, `soc`

4. **Add Repository Description**
   - "Professional AI-Powered Threat Intelligence Dashboard for cybersecurity analysts and SOC teams"

5. **Enable Issues and Discussions** (optional)
   - Go to Settings > General
   - Enable Issues and Discussions if you want community engagement

## GitHub Pages (Optional)

To deploy the dashboard to GitHub Pages:

1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/ai-threat-intel-dashboard/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## GitHub Actions CI/CD

The project includes a CI workflow (`.github/workflows/ci.yml`) that will:
- Run on pushes and pull requests
- Test with Node.js 18.x and 20.x
- Run linting
- Build the project
- Verify build artifacts

This will run automatically when you push to GitHub.

## Adding a GitHub Release

1. Go to your repository on GitHub
2. Click "Releases" > "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Description: Copy from CHANGELOG.md
6. Publish release

## Next Steps

- [ ] Update repository URL in package.json
- [ ] Update README with your repository URL
- [ ] Update security contact email
- [ ] Review and commit all changes
- [ ] Push to GitHub
- [ ] Create initial release
- [ ] Add repository topics and description
- [ ] Enable GitHub Actions

Your project is now ready for GitHub! 🚀

