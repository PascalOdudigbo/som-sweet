import { AuthProvider } from '@/contexts/AuthProvider'
import { CartProvider } from '@/contexts/CartProvider'
import { ToastProvider } from '@/components'
import '../../styles/_globals.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}