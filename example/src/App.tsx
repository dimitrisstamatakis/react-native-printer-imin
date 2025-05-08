import { Provider } from '@fruits-chain/react-native-xiaoshu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import PrinterImin, { IminPrintAlign } from 'react-native-printer-imin';
import { LanguageContext, LanguageProvider } from './LanguageContext';
import HomePage from './views/v1';
import NewHomePage from './views/v2';
import CashBoxInfoPage from './views/v2/CashBoxInfo';
import PrintBarCodePage from './views/v2/PrintBarCode';
import PrinterInfoPage from './views/v2/PrinterInfo';
import PrintTextPage from './views/v2/PrintText';
import TransactionPage from './views/v2/Transaction';
const Stack = createNativeStackNavigator();
export default function App() {
  const [printerStatus, setPrinterStatus] = React.useState<{
    code: string;
    message: string;
  }>();
  React.useEffect(() => {
    const close = PrinterImin.receiveBroadcastStream.listen((payload) => {
      console.log(payload.eventData, payload.eventName);
      if (payload.eventName === 'printer_status') {
        setPrinterStatus(payload.eventData);
        console.log(printerStatus);
      }
    });
    return () => {
      close();
    };
  }, [printerStatus]);

  console.log('version:', PrinterImin.version);

  // React.useEffect(() => {
  //   async function enableGreek(encodePages: string[]) {
  //     // 1 – make sure the service is bound and params are ready

  //     // 2 – fetch the table (you’ve done this already)

  //     // 3 – pick whichever Greek page you prefer
  //     const idx = encodePages.indexOf('CP1253'); // or 'CP1253'
  //     if (idx !== -1) {
  //       await PrinterImin.setFontCodepage(idx);
  //       console.log('Printer switched to', encodePages[idx]);
  //     } else {
  //       throw new Error(
  //         'Greek code-page not found – will fall back to bitmap text'
  //       );
  //     }
  //   }

  //   async function getPrinterStatus() {
  //     // 2 – get the printer status
  //     const status = await PrinterImin.getPrinterStatus();
  //     console.log('Printer status:', status);
  //   }

  //   async function getEncodingsList() {
  //     const encodings = await PrinterImin.getFontCodepage();
  //     return encodings;
  //   }

  //   async function initPrinter() {
  //     await PrinterImin.initPrinter();
  //     await PrinterImin.initPrinterParams();
  //     await getPrinterStatus();
  //   }

  //   async function start() {
  //     try {
  //       await initPrinter();
  //       const srv = await PrinterImin.getServiceVersion();
  //       console.log('Service:', srv); // e.g. "1.0.0.12" or "1.0.0.15"
  //       const encodings = await getEncodingsList();
  //       console.log('Encodings:', encodings);

  //       await enableGreek(encodings);

  //       const curEnc = await PrinterImin.getCurCodepage();

  //       await PrinterImin.printText('Καλημέρα κόσμε\n', 'CP1253');

  //       console.log('Current Encoding:', curEnc);
  //     } catch (error) {
  //       console.error('error:', error);
  //     }
  //   }
  //   start();
  // }, []);

  React.useEffect(() => {
    (async () => {
      await PrinterImin.initPrinter();
      await PrinterImin.initPrinterParams();

      const pages = await PrinterImin.getFontCodepage();
      const idx = pages.indexOf('CP1253'); // or 'CP737'
      await PrinterImin.setFontCodepage(idx);

      // await PrinterImin.printText('Καλημέρα κόσμε\n', 'CP1253');

      await PrinterImin.printTextBitmap('Καλημέρα κόσμε', {
        align: IminPrintAlign.center,
      });

      const cur = await PrinterImin.getCurCodepage();
      console.log('Current code-page after print:', cur); // CP1253
    })();
  }, []);

  return (
    <Provider>
      <LanguageProvider>
        <LanguageContext.Consumer>
          {({ language }) => (
            <NavigationContainer key={language}>
              <Stack.Navigator initialRouteName="Home">
                {PrinterImin.version === '2.0.0' ? (
                  <>
                    <Stack.Screen
                      name="Home"
                      options={{
                        title: 'v2 Printer API',
                      }}
                    >
                      {(props) => {
                        return (
                          <NewHomePage
                            {...props}
                            printerStatus={printerStatus}
                          />
                        );
                      }}
                    </Stack.Screen>
                    <Stack.Screen
                      name="PrinterInfo"
                      component={PrinterInfoPage}
                    />
                    <Stack.Screen
                      name="CashBoxInfo"
                      component={CashBoxInfoPage}
                    />
                    <Stack.Screen
                      name="Transaction"
                      component={TransactionPage}
                    />
                    <Stack.Screen name="PrintText" component={PrintTextPage} />
                    <Stack.Screen
                      name="PrintBarCode"
                      component={PrintBarCodePage}
                    />
                  </>
                ) : (
                  <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{ title: 'v1 Printer API' }}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </LanguageContext.Consumer>
      </LanguageProvider>
    </Provider>
  );
}
