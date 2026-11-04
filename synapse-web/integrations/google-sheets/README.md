# Send doubts to a Google Sheet

The Contact Us form sends each doubt to the web address in `DOUBTS_WEBHOOK_URL`. This folder holds a small Google Apps Script that receives those doubts and adds them as rows in a Google Sheet.

**This has to be done in the club's Google account** (it cannot be done from the code). It takes about 5 minutes. The script has not been run against Google by me; the website side was tested against a local stand-in.

## 1. Create the Sheet and add the script

1. Sign in to the Google account that should own the doubts (a shared club account is better than a personal one) and create a new Google Sheet. Name it, for example, **Synapse Doubts**.
2. In the Sheet, open **Extensions → Apps Script**.
3. Delete the sample code, then paste in the whole of [`doubts-apps-script.gs`](doubts-apps-script.gs).
4. *(Recommended)* In the first lines, set `SHARED_SECRET` to any long random text, for example `SHARED_SECRET = "k3v9-PLACEHOLDER-make-your-own"`. Remember it for step 3.
5. Click **Save**.

## 2. Publish it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon beside "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
4. Click **Deploy**, then **Authorize access**, and approve it with your Google account. (Google shows an "unverified app" warning for your own scripts: choose Advanced, then Go to the project.)
5. Copy the **Web app URL**. It ends in `/exec`.

Check it worked: open that URL in a browser. You should see "Synapse doubts endpoint is running."

## 3. Connect the website

1. In `synapse-web/`, copy `.env.example` to `.env.local`.
2. Set the line to your URL. If you used a `SHARED_SECRET`, add it to the end:

   ```
   DOUBTS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec?token=YOUR_SECRET
   ```
3. Restart `npm run dev`, open <http://localhost:3000/contact>, and send a test doubt. A row should appear in the **Doubts** tab of the Sheet (the script creates the tab and its header row the first time).
4. When you publish the site, set the same `DOUBTS_WEBHOOK_URL` in your host's environment settings.

## Good to know

- **Changing the script later:** Deploy → *Manage deployments* → edit the deployment → *New version*. Using "New deployment" again gives a **new URL**.
- **Keep the URL private.** Anyone who has it (and the token) can add rows. Never commit it; `.env.local` is git-ignored.
- **Who sees the doubts:** whoever the Sheet is shared with. Share it only with the people who answer doubts.
- **Replying:** use the Email column. The Status column starts as "New"; change it by hand when answered.
- **Limits:** Google caps how many requests a free account's scripts can handle per day. That is far more than a club form needs.
