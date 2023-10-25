"use client";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import Favicon from "@/public/favicon.ico";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";

// Layout for the page
export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>FrontEndBmxNext</title>
        <meta name="description" content="BmxNext" />
        <meta name="author" content="HacksJuanda" />
        <link rel="icon" href={Favicon.src} />
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div data-theme="mytheme">
              <Navbar />
              {children}
              <Footer />
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
