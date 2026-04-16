export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    padding: 0,
                    background: "linear-gradient(to bottom, #8b0000, #000)",
                }}
            >
                {children}
            </body>
        </html>
    );
}