# Kharcha

A private monthly expense tracker. Every user has their own account and sees only their own data.

Plain HTML, CSS and JavaScript. No framework and no build step. It is hosted on GitHub Pages, and the data is stored in a free Supabase database.

## Features

- **Private accounts:** sign in with an email and password. Row Level Security in the database guarantees that a user can only read and write their own data.
- **Monthly screens:** the current month opens automatically after sign-in. Move between months with the arrows; each month is independent.
- **Regular Expenses:** a personal list of recurring bills (rent, recharge, EMI, subscriptions...). Their total is the monthly budget, and one tap adds them to the current month.
- **Budget colors:** the month header stays default below 87.5% of the budget (for an 80,000 budget: below 70,000), turns **yellow** from there up to the budget, and **red** above it.
- **Personal preferences:** theme, text size, expense name color, amount color, manual budget and warning level.
- **Works offline** and syncs between your devices when you are back online.

## Setting up the database (one time)

1. Create a free project at https://supabase.com (region: Mumbai).
2. Open **SQL Editor**, paste the contents of `supabase-setup.sql` and click **Run**.
3. Open **Authentication > Sign In / Providers > Email** and turn **Confirm email** off, then Save. (Otherwise every new user must confirm an email address first.)
4. Open **Project Settings > API Keys**, copy the **Project URL** and the **publishable key** (`sb_publishable_...`, or the older `anon` key).
5. In `index.html`, find `const CFG={url:'',key:''};` and paste both values in.
6. Never put the `secret` or `service_role` key in the app.

While `CFG` is empty the app runs in local mode: no sign-in, and data stays in this browser only.

## Publishing on GitHub Pages

1. Push the files to a public repository.
2. **Settings > Pages > Deploy from a branch > `main` / `(root)` > Save**.
3. The app is live at `https://<username>.github.io/<repository>/` (the repository name is case-sensitive).

Then open the link on each phone and laptop and choose **Install app** (Chrome) or **Share > Add to Home Screen** (iPhone Safari).

## Good to know

- Each user creates their own account from the sign-in screen (**New here? Create an account**). When everyone has signed up, turn off **Allow new users to sign up** in Supabase (Authentication > Sign In / Providers) so strangers cannot create accounts.
- There is no email-based password reset. If someone forgets a password, change it for them under **Authentication > Users** in the Supabase dashboard.
- Signing out removes the data from that device (it stays in the account), so a shared phone never shows another person's expenses.
- Data that already exists in a browser before the first sign-in is added to the account of whoever signs in first, after a confirmation.
- On iPhone, Safari and the Home Screen app keep separate storage. Sign in inside the installed app.
- Keep an occasional backup: **Menu > Download backup**.

## Releasing an update

Change `VERSION` in `sw.js` (for example `kharcha-v5`) on every release, otherwise phones keep showing the cached old version. Then:

```
git add .
git commit -m "Describe the change"
git push
```
