---
description: Build Release APK
---
1. Navigate to the project root
2. Build the web assets
   - Run `npm run build`
3. Sync assets with Capacitor
   - Run `npx cap sync`
4. Build the Android APK
   - Navigate to `android` directory
   - Run `./gradlew assembleRelease`
   - If it fails, try `./gradlew assembleDebug`
