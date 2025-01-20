import "./globals.css";
import Navigation from "./navigation";
import ThemeToggle from "./themeToggle";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Navigation />
        <ThemeToggle />
        <main>{children}</main>
      </body>
    </html>
  );
}