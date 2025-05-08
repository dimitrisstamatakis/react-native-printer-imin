Summary of Steps Taken
Gradle & AndroidX Issues

Fixed Gradle version mismatch by downgrading to Gradle 7.5 to match AGP 7.2.1.
Enabled AndroidX and Jetifier in gradle.properties:
Dependency Resolution

Ensured all required repositories (google(), mavenCentral(), JitPack, and local React Native maven) were present in android/build.gradle.
Confirmed that the library should not be built standalone; instead, build and run from the example app.
React Native Module Bridge Fixes

Updated Java methods to convert List<String> to WritableArray before resolving promises.
Ensured all promise branches resolve or reject.
Added a suggestion to unregister broadcast receivers to avoid memory leaks.
Noted to avoid blocking the main thread with heavy operations.
Building and Running

Confirmed that all native changes should be tested via the example app, not by building the library module directly.
Used scripts in example/package.json:
yarn example:android to build and run the app.
yarn example:start to start the Metro bundler.

## Quick Guide: Modifying Java Files in the Library

1. Edit your Java files in android/src/main/java/... as needed.

2. Rebuild and run the example app to test your changes:

3. Go to example/android and run:

```bash
 .\gradlew.bat clean
```

after that:

```bash
 .\gradlew.bat assembleDebug
```

4. Then, navigate back to the root directory and run:

```bash
 yarn example:android
```

5. When this finishes, you can run:

```bash
 yarn example:start
```

From the root:
Or from example/android:
Restart the app on your device/emulator after native changes (a JS reload is not enough).
If you add new dependencies or change Gradle files, sync Gradle and rebuild.
If you add or change broadcast receivers, unregister them in onCatalystInstanceDestroy to avoid leaks.
That’s it! You’re set up for efficient native module development.
If you need to update the library or publish, follow standard npm/yarn publishing steps.3. Restart the app on your device/emulator after native changes (a JS reload is not enough). 4. If you add new dependencies or change Gradle files, sync Gradle and rebuild. 5. If you add or change broadcast receivers, unregister them in onCatalystInstanceDestroy to avoid leaks.

That’s it! You’re set up for efficient native module development.
If you need to update the library or publish, follow standard npm/yarn publishing steps.
