import '../src/index.css';

export const metadata = {
  title: 'KeebLab',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
