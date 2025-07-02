# Journal

Starting 6/27/2025, I've decided to start a journal in accordance with this project to document any problems I find while testing.  

Today, I came across an error where my OAuth popup seems to fail silently on the main server, but throws an error at localhost testing. I first tried to add error catching functionality to the program, and changed the origins to allow the main page - which allowed the popup to manifest (? bad wording here). However, I now got the following error: "You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy."

This error appears to be related to some kind of redirect url misconfiguration, so I added my player as the authorization redirect. Now, I get errors about my security - the website appears to violate 'the following Content Security Policy directive: "script-src 'unsafe-inline' 'unsafe-eval' blob: data:"'. I've not worked with CSP before, as most of my websites have been completely self-contained and/or self referencing with no APIs used. So, after a bit of research, I discovered that I'd have to make my CSP more lenient in order to allow requests and communication with servers to come through. I'll test a CSP that allows basically everything in as long as it's from the correct google URLs. This seemed to work OK, but it still returned a "'unsafe-inline' 'unsafe-eval' blob: data:" as required so I'll add that now. I also added an identical "script-src-elem" tag. After a few refactors of the CSP, I decided it can't be a problem with the main pages CSP since adding and removing many elements as requested didn't work - there is a referenced script in the error that appears to have its own CSP somehow? I'll have to troubleshoot this error much much more, but for now, I'll delete the entire CSP so as to not cause problems from here on out with other APIs and more.

As it turns out, there was primarily an issue with signing in that needed solving - I had entered the authorized URL for JavaScript in with a .com suffix / TLD rather than an .io TLD.  

Turns out that as well, GitHub Pages (which is where I'm hosting my content for now) doesn't support a flexible CSP - so the previous method of IFrame embedding won't be efficient. Instead, we'll use the "OAuth2 Redirect Flow" option in order to compensate for this. I'll test ONE last CSP "fix" before attempting to move on to a redirect option.

Nope, looks like my code is still malfunctioning (as I expected), and I'll now be switching to an OAuth2 Redirect Flow in order to comply with the preset CSP from GitHub Pages.  

After hours of wrestling with PKCE (and a fundamental misunderstanding of google's implementation of it) I've decided to use Netlify to provide a secure access point and authenticate properly!  
