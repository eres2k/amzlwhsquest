# AMZL WHS Quest - Android APK Build Guide

This guide explains how to build the Android APK version of AMZL WHS Coordinator Quest with on-screen touch controls.

## Features

- **On-Screen D-Pad**: Virtual directional pad for movement (left side)
- **Action Button**: Large tap button for interactions (right side)
- **Fullscreen Mode**: Tap the fullscreen button (top-right) for immersive gameplay
- **Landscape Orientation**: Optimized for landscape play with rotation hints
- **Offline Support**: PWA-enabled with service worker for offline play
- **Touch-Optimized**: All game states work with touch controls

## Quick Play (Web/PWA)

You can play directly in a mobile browser:

1. Open `AMZLWHSQUEST122-android.html` on your Android device
2. The browser will prompt "Add to Home Screen" for app-like experience
3. Rotate to landscape orientation
4. Use the on-screen controls to play!

## Building the APK

### Option 1: Using Cordova (Recommended)

#### Prerequisites
- Node.js (v14+)
- Java JDK 11+
- Android SDK (API 33+)
- Cordova CLI

#### Steps

```bash
# Install Cordova globally
npm install -g cordova

# Create Cordova project
cordova create whs-quest com.amzlwhsquest.game "WHS Quest"
cd whs-quest

# Copy game files to www folder
cp ../AMZLWHSQUEST122-android.html www/
cp ../manifest.json www/
cp ../sw.js www/
cp ../*.mp3 www/
cp -r ../icons www/

# Add Android platform
cordova platform add android

# Copy config.xml
cp ../config.xml .

# Generate icons (requires ImageMagick)
# For each size: convert icons/icon.svg -resize NxN icons/icon-N.png

# Build debug APK
cordova build android

# Build release APK (requires signing)
cordova build android --release
```

The APK will be generated at:
- Debug: `platforms/android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Option 2: Using Capacitor

```bash
# Install Capacitor
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor
npx cap init "WHS Quest" com.amzlwhsquest.game

# Copy files to www folder
mkdir -p www
cp AMZLWHSQUEST122-android.html www/index.html
cp manifest.json sw.js www/
cp *.mp3 www/

# Add Android
npx cap add android

# Build
npx cap build android
```

### Option 3: Using PWABuilder (Easiest)

1. Deploy the game to a web server with HTTPS
2. Go to https://www.pwabuilder.com/
3. Enter your game URL
4. Click "Build My PWA"
5. Select "Android" and download the APK

### Option 4: Using Bubblewrap

```bash
# Install Bubblewrap
npm install -g @anthropic/anthropic

# Initialize
bubblewrap init --manifest="https://your-site.com/manifest.json"

# Build
bubblewrap build
```

## Icon Generation

Generate icons from the SVG source:

```bash
# Using ImageMagick
for size in 36 48 72 96 128 144 152 192 384 512; do
  convert icons/icon.svg -resize ${size}x${size} icons/icon-${size}.png
done
```

Or use online tools like:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

## Controls

| Control | Action |
|---------|--------|
| D-Pad Up | Move up / Menu navigate |
| D-Pad Down | Move down / Menu navigate |
| D-Pad Left | Move left / Character select prev |
| D-Pad Right | Move right / Character select next |
| Action Button | Interact / Confirm / Attack |
| Tap Screen | Advance dialog / Menus |
| Fullscreen Button | Toggle fullscreen mode |

## Troubleshooting

### Touch controls not appearing
- Make sure you're on a touch device
- Controls only show on devices with `(hover: none) and (pointer: coarse)`

### Game runs slow
- Close other apps
- Try fullscreen mode for better performance
- Ensure hardware acceleration is enabled in browser/WebView

### Audio not playing
- Tap the screen to initialize audio (required by mobile browsers)
- Check device volume

### Orientation issues
- Lock your device orientation to landscape
- The game shows a rotation hint in portrait mode

## File Structure

```
amzlwhsquest/
├── AMZLWHSQUEST122-android.html  # Main game with touch controls
├── manifest.json                  # PWA manifest
├── sw.js                          # Service worker
├── config.xml                     # Cordova configuration
├── icons/
│   ├── icon.svg                   # Source icon
│   └── icon-*.png                 # Generated icons
└── res/screen/android/            # Splash screens
```

## Version Info

- Game Version: 1.0.0
- Android Min SDK: 22 (Lollipop 5.1)
- Android Target SDK: 33 (Android 13)
- Orientation: Landscape only
- Display: Fullscreen

## License

This game is for educational and entertainment purposes.
