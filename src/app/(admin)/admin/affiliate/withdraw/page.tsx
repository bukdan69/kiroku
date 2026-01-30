"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Wallet, DollarSign, AlertCircle,
  CheckCircle, CreditCard, Building, User
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AffiliateWithdrawPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const balance = {
    available: 1800000,
    pending: 540000,
    total: 2340000,
    minWithdrawal: 100000,
    withdrawalFee: 2500,
  };

  const withdrawalHistory = [
    { id: "1", amount: 1000000, fee: 2500, status: "completed", date: "2026-01-20" },
    { id: "2", amount: 500000, fee: 2500, status: "completed", date: "2026-01-10" },
    { id: "3", amount: 300000, fee: 2500, status: "pending", date: "2026-01-28" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    const withdrawAmount = parseInt(amount);
    if (withdrawAmount < balance.minWithdrawal) {
      alert(`Minimum withdrawal is Rp ${balance.minWithdrawal.toLocaleString()}`);
      setIsSubmitting(false);
      return;
    }

    if (withdrawAmount > balance.available) {
      alert("Insufficient balance");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      alert("Withdrawal request submitted successfully!");
      router.push("/admin/dashboard?tab=affiliate");
    }, 2000);
  };

  const netAmount = amount ? parseInt(amount) - balance.withdrawalFee : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/admin/dashboard?tab=affiliate" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Affiliate
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Withdraw Commission</h1>
              <p className="text-sm text-muted-foreground">Tarik komisi affiliate Anda</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left - Balance Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Balance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-green-600">
                    Rp {balance.available.toLocaleString()}
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-semibold">Rp {balance.pending.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Earned</span>
                    <span className="font-semibold">Rp {balance.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Withdrawal</span>
                  <span className="font-semibold">Rp {balance.minWithdrawal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Withdrawal Fee</span>
                  <span className="font-semibold">Rp {balance.withdrawalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Time</span>
                  <span className="font-semibold">1-3 hari kerja</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {withdrawalHistory.map((withdrawal) => (
                    <div key={withdrawal.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">
                          Rp {withdrawal.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{withdrawal.date}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        withdrawal.status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {withdrawal.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Withdrawal Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Request</CardTitle>
                <CardDescription>
                  Isi form di bawah untuk mengajukan penarikan komisi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah Penarikan</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Masukkan jumlah"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10"
                        required
                        min={balance.minWithdrawal}
                        max={balance.available}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Min: Rp {balance.minWithdrawal.toLocaleString()} | 
                      Max: Rp {balance.available.toLocaleString()}
                    </p>
                  </div>

                  {/* Calculation */}
                  {amount && parseInt(amount) >= balance.minWithdrawal && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Jumlah Penarikan:</span>
                            <span className="font-semibold">Rp {parseInt(amount).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Biaya Admin:</span>
                            <span className="font-semibold">- Rp {balance.withdrawalFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t font-bold">
                            <span>Yang Diterima:</span>
                            <span className="text-green-600">Rp {netAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Bank Details */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Bank Account Details
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="bankName">Nama Bank</Label>
                      <Input
                        id="bankName"
                        placeholder="e.g., BCA, Mandiri, BNI"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Nomor Rekening</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="accountNumber"
                          placeholder="1234567890"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountName">Nama Pemilik Rekening</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="accountName"
                          placeholder="Sesuai KTP"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nama harus sesuai dengan nama di KTP yang terverifikasi
                      </p>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-900 text-sm">
                      <p className="font-semibold mb-2">Penting:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Pastikan data bank Anda benar</li>
                        <li>Proses withdrawal memakan waktu 1-3 hari kerja</li>
                        <li>Anda akan menerima notifikasi saat withdrawal diproses</li>
                        <li>Biaya admin Rp {balance.withdrawalFee.toLocaleString()} akan dipotong otomatis</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting || !amount || parseInt(amount) < balance.minWithdrawal}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Submit Withdrawal
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
