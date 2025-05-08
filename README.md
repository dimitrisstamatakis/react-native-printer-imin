# react-native-printer-imin

Native Module For iMin Printer SDK Plugin

## How to run this Repo...

1. **Step #1**, you need the latest version of `yarn` or at least v3+
   To get it easily, reliably and fast run command below, checkout the [Official Site](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) if you wanna:

   > ℹ️ <i>Why can I not use `npm`? </i> | <i>Because this repo is using a **Yarn Workspaces**, npm does not support it (I think at least)</i>

```sh
npm install --global yarn
```

2. **Step #2**, close and re-open your terminal and check the version:

```sh
yarn --version
```

3. **Step #3**, you need to download the dependencies:

```sh
yarn
# or yarn install
```

4. **Step #4**, now you should be able to run the Example Project. Do **NOT** change working-directory!
   Just run:

```sh
yarn example:start
```

5. The **Next steps** are to setup the PC <--> Android Device connection + Make the App think Metro bundler is running from its localhost (like be running from within the Device's OS)

6. Connect the Device through USB **Data Cable** with the PC, then:

   - Enable: "**use developer options**",
   - Enable: "**USB debugging**"

7. The Device needs to Authorize the PC, run:

```sh
adb devices
```

You should see something like this:

```sh
➜  adb devices
List of devices attached
<device-name>       device (or unauthorized)
```

If you see `unauthorized`, check the Device's screen, probably a modal has appears that you need to confirm.
if you see `device`, you are good to go, proceed to next step.

8. Now we need to bind the Metro Server running on the PC through the ADB to make the device to think that its running locally.

```sh
➜  adb reverse tcp:3000 tcp:3000
3000
```

> 🚨⚠️ Usually RN Devs use `adb reverse tcp:8081 tcp:8081`, but iMin has something running on port 8081 or its blocked, therefore we need to use a different one.

9. Now execute the following to start the Metro Bundler's Dev Server:

```sh
yarn example:start # ⚠️🚨 from the root dir! Not "react-native-printer-imin/example"
```

10. I will assume you know how to build, and install the App in the Device. If you do not ChatGPT or use GitHub's Copilot (it fit the whole codebase on its context window)

11. Open the App and run:

```sh
adb shell input keyevent 82
```

12. This should open React Native's Dev Tools

13. Select the "Settings" option (or maybe its called Dev Settings)

14. Under the "Debugging" Section, presses on "Debug server host & port for device"

15. Enter: `localhost:3000` and press OK

16. Go back and reload the App -> `adb shell input keyevent 82` -> "Reload" (or Restart)

17. 🎊 Congratulations, it should work now!

## Installation

```sh
npm install react-native-printer-imin
```

## Usage

```js
import PrinterImin from 'react-native-printer-imin';

// ...
PrinterImin.initPrinter();

PrinterImin.getPrinterStatus().then((info) => {
  console.log(info);
});

PrinterImin.printText('hello world');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

# 更新版本号

# 更新 0.10.1 版本

# 新增标签打印 api

# 编辑 package.json 文件，将 "version": "0.8.0" 更新为 "version": "0.9.0"
