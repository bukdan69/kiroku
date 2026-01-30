"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard, 
  Wallet, 
  QrCode, 
  BanknoteIcon,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  User,
  Smartphone
} from "lucide-react"

export default function PaymentsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedMethod, setSelectedMethod] = useState<'midtrans' | 'bank_transfer' | 'qris' | 'ewallet'>('midtrans')
  const [amount, setAmount] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<any>(null)
  const [ewalletProvider, setEwalletProvider] = useState<'gopay' | 'ovo' | 'dana'>('gopay')

  const currentBalance = "Rp 1.250.000" // Mock data
  const pendingAmount = searchParams.get('amount') || ''

  useEffect(() => {
    if (pendingAmount) {
      setAmount(pendingAmount)
    }
  }, [pendingAmount])

  const handlePaymentRequest = async () => {
    setIsProcessing(true)
    setPaymentResult(null)

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_transaction',
          amount: parseInt(amount),
          method: selectedMethod,
          groupId: searchParams.get('groupId'),
          periodId: searchParams.get('periodId'),
          type: 'contribution'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        if (result.payment?.paymentUrl) {
          window.location.href = result.payment.paymentUrl
        } else if (result.payment?.metadata) {
          setPaymentResult(result)
        }
      } else {
        setPaymentResult({ error: result.error })
      }
    } catch (error) {
      console.error('Payment request error:', error)
      setPaymentResult({ error: 'Payment processing failed' })
    } finally {
      setIsProcessing(false)
    }
  }

  const paymentMethods = [
    { value: 'midtrans', label: 'Midtrans', icon: CreditCard, description: 'Pembayaran online dengan kartu kredit/debit' },
    { value: 'bank_transfer', label: 'Transfer Bank', icon: BanknoteIcon, description: 'Transfer langsung ke rekening bank' },
    { value: 'qris', label: 'QRIS', icon: QrCode, description: 'Scan kode QR untuk membayar' },
    { value: 'ewallet', label: 'E-Wallet', icon: Wallet, description: 'Bayar via GoPay, OVO, DANA' }
  ]

  const currentBalance = "Rp 1.250.000" // Mock data
  const groupId = searchParams.get('groupId') || ''
  const periodId = searchParams.get('periodId') || ''

  if (!user) {
    router.push('/auth')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            ← Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Pembayaran</h1>
            <p className="text-muted-foreground">Lanjutkan pembayaran Anda dengan aman</p>
          </div>
        </div>

        {(groupId || periodId) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informasi Pembayaran</CardTitle>
              <CardDescription>
                Detail grup dan periode yang harus dibayar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Grup ID</p>
                  <p className="font-medium">{groupId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Periode</p>
                  <p className="font-medium">#{periodId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Jumlah Tagihan</p>
                  <p className="text-2xl font-bold text-primary">
                    {pendingAmount && new Intl.NumberFormat('id-ID').format(parseInt(pendingAmount), {
                      style: 'currency',
                      currency: 'IDR'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Saat Ini</p>
                  <p className="text-2xl font-bold text-green-600">{currentBalance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Pembayaran Aman
            </CardTitle>
            <CardDescription>
              Pilih metode pembayaran yang paling nyaman untuk Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Jumlah Pembayaran</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  Rp
                </span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100000"
                  disabled={isProcessing}
                  className="pl-12"
                />
              </div>
              {amount && parseInt(amount) > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Jumlah yang harus dibayar: Rp {new Intl.NumberFormat('id-ID').format(parseInt(amount), {
                    style: 'currency',
                    currency: 'IDR'
                  })}
                </p>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label>Metode Pembayaran</Label>
              <Tabs value={selectedMethod} onValueChange={setSelectedMethod} disabled={isProcessing}>
                <TabsList className="grid w-full grid-cols-4">
                  {paymentMethods.map((method) => (
                    <TabsTrigger key={method.value} value={method.value} className="flex flex-col items-center gap-2 p-3">
                      <method.icon className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </TabsList>

              {paymentMethods.map((method) => (
                <TabsContent key={method.value} value={method.value} className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <method.icon className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">{method.label}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    
                    {method.value === 'midtrans' && (
                      <div className="mt-3 text-sm text-green-600">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Pembayaran Instan</span>
                        </div>
                        <div className="text-muted-foreground">
                          Pembayaran diproses langsung, aman dalam hitungan detik.
                        </div>
                      </div>
                    )}

                    {method.value === 'bank_transfer' && (
                      <div className="mt-3 text-sm text-yellow-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Verifikasi Manual</span>
                        </div>
                        <div className="text-muted-foreground">
                          Transfer bank akan diverifikasi dalam 1x24 jam.
                        </div>
                      </div>
                    )}

                    {method.value === 'qris' && (
                      <div className="mt-3 text-sm text-blue-600">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Scan & Bayar</span>
                        </div>
                        <div className="text-muted-foreground">
                          Cukup scan kode QR dengan aplikasi pembayaran Anda.
                        </div>
                      </div>
                    )}

                    {method.value === 'ewallet' && (
                      <div className="mt-3">
                        <Label className="text-sm">Provider E-Wallet</Label>
                        <select 
                          value={ewalletProvider} 
                          onChange={(e) => setEwalletProvider(e.target.value as 'gopay' | 'ovo' | 'dana')}
                          className="w-full p-2 border rounded-md"
                          disabled={isProcessing}
                        >
                          <option value="gopay">GoPay</option>
                          <option value="ovo">OVO</option>
                          <option value="dana">DANA</option>
                        </select>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Smartphone className="h-3 w-3" />
                          <span>Bayar via {ewalletProvider.toUpperCase()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePaymentRequest}
              disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses Pembayaran...
                </>
              ) : (
                <>
                  Bayar Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Payment Result */}
        {paymentResult && (
          <Card className={`mt-6 ${paymentResult.error ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {paymentResult.error ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <CardTitle className={paymentResult.error ? 'text-red-700' : 'text-green-700'}>
                  {paymentResult.error ? 'Pembayaran Gagal' : 'Pembayaran Berhasil'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentResult.error ? (
                <div className="text-red-600">
                  <p className="font-medium mb-2">Terjadi kesalahan:</p>
                  <p>{paymentResult.error}</p>
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setPaymentResult(null)}
                    >
                      Coba Lagi
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-green-600">
                  <p className="font-medium mb-2">Pembayaran berhasil diproses!</p>
                  {paymentResult.paymentUrl ? (
                    <div>
                      <p className="text-sm mb-3">Silakan lanjutkan ke halaman pembayaran:</p>
                      <Button 
                        className="w-full"
                        onClick={() => window.open(paymentResult.paymentUrl, '_blank')}
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Buka Halaman Pembayaran
                      </Button>
                    </div>
                  ) : paymentResult.payment?.metadata ? (
                    <div className="space-y-4">
                      <p className="text-sm">Petunjuk pembayaran:</p>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        {paymentResult.payment.metadata?.bank && (
                          <div>
                            <p className="font-medium">Transfer Bank</p>
                            <div className="text-sm space-y-1">
                              <p>Bank: {paymentResult.payment.metadata.bank}</p>
                              <p>No. Rekening: {paymentResult.payment.metadata.account_number}</p>
                              <p>A.N: {paymentResult.payment.metadata.account_holder}</p>
                            </div>
                          </div>
                        )}
                        
                        {paymentResult.payment.metadata?.payment_code && (
                          <div>
                            <p className="font-medium">E-Wallet</p>
                            <div className="text-sm space-y-1">
                              <p>Kode: {paymentResult.payment.metadata.payment_code}</p>
                              <p>Catatan: {paymentResult.payment.metadata.message}</p>
                            </div>
                          </div>
                        )}
                        
                        {paymentResult.payment.metadata?.qr_code && (
                          <div>
                            <p className="font-medium">QRIS</p>
                            <div className="text-sm">
                              <p className="mb-2">Scan kode QR berikut:</p>
                              <div className="bg-white p-4 border rounded inline-block">
                                <span className="font-mono text-lg tracking-wider">
                                  {paymentResult.payment.metadata.qr_code}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Customer Service */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Butuh Bantuan?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Hubungi customer service kami jika mengalami kendala pembayaran
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm">
                  <Smartphone className="mr-2 h-4 w-4" />
                  WhatsApp: +62 812-3456-7890
                </Button>
                <Button variant="outline" size="sm">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Bantuan Online
                </Button>
              </div>
            </CardContent>
          </Card>
        </Card>
      </div>
    </div>
  )
}