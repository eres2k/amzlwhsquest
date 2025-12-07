#!/bin/bash
# AMZL WHS Quest - Android APK Build Script
# This script builds the Android APK using Cordova

set -e

echo "==================================="
echo "AMZL WHS Quest - Android APK Builder"
echo "==================================="

# Check for required tools
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "Error: $1 is not installed. Please install it first."
        exit 1
    fi
}

check_tool node
check_tool npm

# Check if Cordova is installed
if ! command -v cordova &> /dev/null; then
    echo "Installing Cordova..."
    npm install -g cordova
fi

# Create build directory
BUILD_DIR="cordova-build"
if [ -d "$BUILD_DIR" ]; then
    echo "Cleaning previous build..."
    rm -rf "$BUILD_DIR"
fi

echo "Creating Cordova project..."
cordova create "$BUILD_DIR" com.amzlwhsquest.game "WHS Quest"
cd "$BUILD_DIR"

# Copy game files
echo "Copying game files..."
cp ../AMZLWHSQUEST122-android.html www/index.html
cp ../manifest.json www/
cp ../sw.js www/
cp ../*.mp3 www/ 2>/dev/null || echo "Note: No MP3 files found in root"
cp -r ../icons www/ 2>/dev/null || mkdir -p www/icons

# Copy Cordova config
cp ../config.xml .

# Add Android platform
echo "Adding Android platform..."
cordova platform add android

# Install plugins
echo "Installing plugins..."
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-screen-orientation
cordova plugin add cordova-plugin-insomnia

# Build debug APK
echo "Building debug APK..."
cordova build android

# Show result
APK_PATH="platforms/android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo ""
    echo "==================================="
    echo "BUILD SUCCESSFUL!"
    echo "==================================="
    echo "APK location: $BUILD_DIR/$APK_PATH"
    echo ""
    echo "To install on your device:"
    echo "  adb install $APK_PATH"
    echo ""
    # Copy APK to root folder for easy access
    cp "$APK_PATH" "../AMZLWHSQUEST-android.apk"
    echo "APK also copied to: AMZLWHSQUEST-android.apk"
else
    echo "Build may have failed. Check the output above for errors."
fi
