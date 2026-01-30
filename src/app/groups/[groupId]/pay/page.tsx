import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const metadata: Metadata = {
  title: "Payment - Arisan KU",
  description: "Pay your arisan contribution",
};

// Mock data
const group = {
  id: 1,
  name: "Arisan Keluarga",
  contribution: 500000,
  period: "Februari 2026",
  dueDate: "2026-02-15",
};

const paymentMethods = [
  {
    id: "wallet",
    name: "Saldo Wallet",
    description: "Bayar menggunakan saldo wallet Anda",
    icon: Wallet,
    balance: 1500000,
  },
  {
    id: "bank_transfer",
    name: "Transfer Bank",
    description: "Transfer melalui Virtual Account",
    icon: Building2,
  },
  {
    id: "credit_card",
    name: "Kartu Kredit/Debit",
    description: "Bayar dengan kartu kredit atau debit",
    icon: CreditCard,
  },
];

export default function PaymentPage({ params }: { params: { groupId: string } }) {
  const adminFee = group.contribution * 0.02; // 2% admin fee
  const total = group.contribution + adminFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-4xl mx-auto p-4 py-8">
        <div className="mb-6">
          <Link 
            href={`/groups/${params.groupId}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Detail Grup
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Pembayaran Iuran</h1>
          <p className="text-muted-foreground">
            Bayar iuran arisan untuk {group.name}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pilih Metode Pembayaran</CardTitle>
                <CardDescription>
                  Pilih metode pembayaran yang Anda inginkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="wallet" className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-3 flex-1 cursor-pointer">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <method.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                          {method.id === "wallet" && method.balance && (
                            <p className="text-sm text-primary mt-1">
                              Saldo: Rp {method.balance.toLocaleString("id-ID")}
                            </p>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Konfirmasi Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Pembayaran Aman</p>
                    <p className="text-sm text-muted-foreground">
                      Transaksi Anda dilindungi dengan enkripsi SSL
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Konfirmasi Otomatis</p>
                    <p className="text-sm text-muted-foreground">
                      Pembayaran akan dikonfirmasi secara otomatis
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Notifikasi Real-time</p>
                    <p className="text-sm text-muted-foreground">
                      Anda akan menerima notifikasi setelah pembayaran berhasil
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Grup Arisan</p>
                  <p className="font-medium">{group.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Periode</p>
                  <p className="font-medium">{group.period}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Jatuh Tempo</p>
                  <p className="font-medium">
                    {new Date(group.dueDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Iuran</span>
                    <span className="font-medium">
                      Rp {group.contribution.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Biaya Admin (2%)</span>
                    <span className="font-medium">
                      Rp {adminFee.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Bayar Sekarang
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Dengan melanjutkan, Anda menyetujui{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Syarat & Ketentuan
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
