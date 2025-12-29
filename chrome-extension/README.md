# Gujarat Services Auto-Fill Chrome Extension

यह Chrome Extension आपके Unified Services Portal से data लेकर official government websites पर forms auto-fill करता है।

## Installation (इंस्टॉलेशन)

1. Chrome browser में `chrome://extensions/` खोलें
2. Top-right में **Developer mode** ON करें
3. **Load unpacked** button पर click करें
4. `chrome-extension` folder select करें

## Usage (उपयोग)

1. Extension icon पर click करें
2. अपने Portal credentials से login करें (email & password)
3. किसी भी supported website पर जाएं
4. **Auto-Fill Current Page** button दबाएं या floating ⚡ button use करें

## Supported Websites

| Service | Website |
|---------|---------|
| Torrent Power | connect.torrentpower.com |
| Adani Gas | www.adanigas.com |
| Gujarat Gas | www.gujaratgas.com |
| AMC Water | ahmedabadcity.gov.in |
| AnyRoR | anyror.gujarat.gov.in |
| PGVCL | www.pgvcl.com |
| UGVCL | www.ugvcl.com |

## Features

- ✅ One-click form filling
- ✅ Secure local storage (data Chrome में safely store होता है)
- ✅ Floating auto-fill button on supported sites
- ✅ Right-click context menu option
- ✅ Visual feedback when fields are filled

## Requirements

- Backend server running on `http://localhost:8000`
- Frontend running on `http://localhost:3000`
- User account created on Unified Services Portal

## Troubleshooting

**Extension not working?**
- Check if backend server is running
- Make sure you're logged in to the extension
- Verify the website is in supported list

**Fields not filling?**
- Some websites may have different form structures
- Try refreshing the page and clicking auto-fill again
