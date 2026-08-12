HOW TO PUT THIS WEBSITE ON GODADDY
==================================

This website is ready to upload as a standard HTML website. No database or
special installation is needed.

BEFORE YOU START
----------------

You need:

1. The client's GoDaddy sign-in information.
2. The client's domain name.
3. An active GoDaddy Web Hosting (cPanel) plan.

Important: A domain by itself does not include file hosting. If the client only
has a domain or a GoDaddy Website Builder plan, purchase or add a Web Hosting
(cPanel) plan before continuing.


STEP 1 - CONNECT THE DOMAIN TO THE HOSTING PLAN
-----------------------------------------------

1. Sign in at https://www.godaddy.com/
2. Open My Products.
3. Under Web Hosting, find the correct hosting plan and click Manage.
4. In Settings, look for Primary Domain.
5. If the client's domain is not already shown, click Change, select or enter
   the client's domain, and confirm the change.
6. Allow up to 24 hours for a domain change to finish.

If the domain and hosting are in the same GoDaddy account, GoDaddy will normally
connect them automatically. If the domain is registered somewhere else, its DNS
A record must point to the IP address shown in the GoDaddy hosting dashboard.


STEP 2 - MAKE A ZIP FILE
------------------------

1. Open this project folder on the computer.
2. Select all of these website items:

   - All .html files, including index.html
   - The images folder
   - The scripts folder
   - The styles folder

3. Right-click the selected items and choose Compress to ZIP file or
   Send to > Compressed (zipped) folder.
4. Name the ZIP file website.zip.

Important: index.html must be at the top level of the ZIP. Do not place all the
website files inside an extra project folder.


STEP 3 - UPLOAD THE WEBSITE
---------------------------

1. Return to the GoDaddy hosting dashboard.
2. Under Websites, click File Manager for the client's domain.
3. Open the domain's root folder. For the primary domain, this is normally
   public_html. GoDaddy may open the correct folder automatically.
4. If an old website is already there, download a backup before changing it.
5. Upload website.zip into the root folder.
6. Select website.zip and click Extract.
7. Confirm that index.html is directly inside the root folder, alongside the
   images, scripts, and styles folders.
8. Delete website.zip from File Manager after extraction if it is no longer
   needed.

The correct layout should look like this:

public_html/
  index.html
  about.html
  contact.html
  other .html files
  images/
  scripts/
  styles/

If File Manager shows public_html/project-folder/index.html, move everything
inside project-folder up one level into public_html.


STEP 4 - CHECK THE LIVE WEBSITE
-------------------------------

1. Open a private/incognito browser window.
2. Visit https://YOUR-DOMAIN.com and replace YOUR-DOMAIN with the real domain.
3. Check the home page, menu links, images, and contact page.
4. Submit one test message through the contact form.
5. The first FormSubmit message may require the client to open an activation
   email sent to highdesertdevelopment@yahoo.com and click the confirmation
   link. After activation, submit the form once more and confirm delivery.


IF THE WEBSITE DOES NOT APPEAR
------------------------------

- Make sure the file is named exactly index.html (all lowercase).
- Make sure index.html is directly in the domain's root folder.
- Make sure the domain is assigned to this hosting plan.
- Wait up to 24 hours if the domain or DNS was just changed.
- Try a private/incognito window to avoid seeing an old cached page.
- If HTTPS shows a warning after DNS is connected, check the hosting dashboard's
  SSL status or contact GoDaddy support.


OFFICIAL GODADDY HELP
---------------------

Upload files with File Manager:
https://www.godaddy.com/help/upload-files-using-my-web-hosting-cpanel-file-manager-3239

Change the primary hosting domain:
https://www.godaddy.com/help/change-the-domain-in-my-web-hosting-cpanel-account-16163
