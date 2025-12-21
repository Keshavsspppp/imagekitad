# Windows Turbopack Symlink Fix

## The Problem
Turbopack (Next.js 16's bundler) fails on Windows because it needs to create symlinks for `node_modules/mongoose`, but Windows requires special privileges for symlinks.

## The Solution - Enable Windows Developer Mode

### Steps:
1. Press `Win + I` to open Windows Settings
2. Go to **Privacy & Security** → **For developers**
3. Turn ON **Developer Mode**
4. Restart your terminal/VS Code
5. Run `npm run dev` again

### Alternative: Run as Administrator
If you can't enable Developer Mode:
1. Close VS Code completely
2. Right-click VS Code icon → **Run as administrator**
3. Open your project folder
4. Run `npm run dev`

## Environment Variables Created
I've created `.env.local` with placeholder values. Update these with your real credentials:

```env
MONGODB_URI=mongodb://localhost:27017/videoapp  # Your MongoDB connection
NEXTAUTH_SECRET=dev-secret-change-in-production-min-32-chars-long  # Generate a secure secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL_ENDPOINT=https://ik.imagekit.io/YOUR_ID  # Your ImageKit endpoint
IMAGEKIT_PRIVATE_KEY=your_private_key  # From ImageKit dashboard
NEXT_PUBLIC_PUBLIC_KEY=your_public_key  # From ImageKit dashboard
```

## After Fixing Symlink Issue
Once Developer Mode is enabled or running as Admin:
```bash
npm run dev
```

Your app will run perfectly at http://localhost:3000 🚀
