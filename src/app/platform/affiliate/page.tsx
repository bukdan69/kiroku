"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, Users, DollarSign, TrendingUp, CheckCircle,
  XCircle, Clock, Eye, Download
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function AffiliateManagementPage() {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleRejectClick = (withdrawalId: string) => {
    setSelectedWithdrawal(withdrawalId);
    setRejectDialogOpen(true);
  };

  const handleRejectSubmit = () => {
    if (rejectionReason.trim() === "") {
      alert("Please enter a rejection reason");
      return;
    }
    // Submit the form
    const form = document.getElementById(`reject-form-${selectedWithdrawal}`) as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };

  const stats = {
    totalAffiliates: 234,
    activeAffiliates: 189,
    pendingWithdrawals: 12,
    totalCommissionPaid: 45600000,
    totalCommissionPending: 8900000,
    thisMonthCommission: 12300000,
  };

  const withdrawalRequests = {
    pending: [
      {
        id: "1",
        affiliateId: "aff-123",
        bandarName: "Budi Santoso",
        email: "budi@email.com",
        amount: 2500000,
        commissionEarned: 5600000,
        commissionWithdrawn: 3100000,
        bankName: "BCA",
        bankAccount: "1234567890",
        bankAccountName: "BUDI SANTOSO",
        requestedAt: "2026-01-30 08:30",
        status: "pending",
      },
      {
        id: "2",
        affiliateId: "aff-456",
        bandarName: "Siti Aminah",
        email: "siti@email.com",
        amount: 1800000,
        commissionEarned: 4200000,
        commissionWithdrawn: 2400000,
        bankName: "Mandiri",
        bankAccount: "9876543210",
        bankAccountName: "SITI AMINAH",
        requestedAt: "2026-01-29 15:20",
        status: "pending",
      },
    ],
    approved: [
      {
        id: "3",
        affiliateId: "aff-789",
        bandarName: "Ahmad Yani",
        email: "ahmad@email.com",
        amount: 3200000,
        approvedAt: "2026-01-28 14:30",
        approvedBy: "Super Admin",
        status: "approved",
      },
    ],
    rejected: [
      {
        id: "4",
        affiliateId: "aff-012",
        bandarName: "Dewi Lestari",
        email: "dewi@email.com",
        amount: 1500000,
        rejectedAt: "2026-01-27 11:30",
        rejectedBy: "Super Admin",
        rejectionReason: "Insufficient balance",
        status: "rejected",
      },
    ],
  };

  const topAffiliates = [
    { rank: 1, name: "Budi Santoso", referrals: 45, commission: 5600000, conversionRate: 78 },
    { rank: 2, name: "Siti Aminah", referrals: 38, commission: 4200000, conversionRate: 72 },
    { rank: 3, name: "Ahmad Yani", referrals: 32, commission: 3800000, conversionRate: 68 },
    { rank: 4, name: "Dewi Lestari", referrals: 28, commission: 3200000, conversionRate: 65 },
    { rank: 5, name: "Rudi Hartono", referrals: 24, commission: 2900000, conversionRate: 62 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/platform/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Affiliate Management</h1>
                <p className="text-sm text-muted-foreground">Kelola program affiliate dan withdrawal komisi</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/platform/settings?tab=fees">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Atur Komisi
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Affiliates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAffiliates}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeAffiliates} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Withdrawals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingWithdrawals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Need approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Commission Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {(stats.totalCommissionPaid / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total paid out
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Commission Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {(stats.totalCommissionPending / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting withdrawal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats.thisMonthCommission / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Commission earned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((stats.totalCommissionPaid / stats.totalAffiliates) / 1000).toFixed(0)}K
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Per affiliate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="withdrawals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="withdrawals" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Withdrawal Requests ({stats.pendingWithdrawals})
            </TabsTrigger>
            <TabsTrigger value="affiliates" className="gap-2">
              <Users className="h-4 w-4" />
              Top Affiliates
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Commission Settings
            </TabsTrigger>
          </TabsList>

          {/* Withdrawal Requests Tab */}
          <TabsContent value="withdrawals">
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending">
                  <Clock className="h-4 w-4 mr-2" />
                  Pending ({withdrawalRequests.pending.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approved ({withdrawalRequests.approved.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejected ({withdrawalRequests.rejected.length})
                </TabsTrigger>
              </TabsList>

              {/* Pending Tab */}
              <TabsContent value="pending" className="space-y-4">
                {withdrawalRequests.pending.map((request) => (
                  <Card key={request.id} className="border-2 border-yellow-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{request.bandarName}</h3>
                              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{request.email}</p>

                            {/* Withdrawal Amount */}
                            <div className="p-4 bg-primary/5 rounded-lg mb-4">
                              <p className="text-sm text-muted-foreground mb-1">Withdrawal Amount</p>
                              <p className="text-3xl font-bold text-primary">
                                Rp {request.amount.toLocaleString()}
                              </p>
                            </div>

                            {/* Commission Summary */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Total Earned</p>
                                <p className="font-semibold">Rp {request.commissionEarned.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Already Withdrawn</p>
                                <p className="font-semibold">Rp {request.commissionWithdrawn.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
                                <p className="font-semibold text-green-600">
                                  Rp {(request.commissionEarned - request.commissionWithdrawn).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Bank Details */}
                            <div className="p-4 border rounded-lg mb-4">
                              <p className="text-sm font-semibold mb-3">Bank Details</p>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground mb-1">Bank</p>
                                  <p className="font-medium">{request.bankName}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Account Number</p>
                                  <p className="font-mono font-medium">{request.bankAccount}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Account Name</p>
                                  <p className="font-medium">{request.bankAccountName}</p>
                                </div>
                              </div>
                            </div>

                            {/* Timestamp */}
                            <p className="text-xs text-muted-foreground">
                              Requested at: {request.requestedAt}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" asChild>
                          <Link href={`/platform/affiliate/${request.affiliateId}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        <form action="/api/platform/affiliate/approve" method="POST" className="inline">
                          <input type="hidden" name="withdrawalId" value={request.id} />
                          <Button 
                            type="submit"
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve Withdrawal
                          </Button>
                        </form>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectClick(request.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <form 
                          id={`reject-form-${request.id}`}
                          action="/api/platform/affiliate/reject" 
                          method="POST"
                          className="hidden"
                        >
                          <input type="hidden" name="withdrawalId" value={request.id} />
                          <input type="hidden" name="rejectionReason" value={rejectionReason} />
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Approved Tab */}
              <TabsContent value="approved" className="space-y-4">
                {withdrawalRequests.approved.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{request.bandarName}</h3>
                            <Badge className="bg-green-600">Approved</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{request.email}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">Amount</p>
                              <p className="font-bold text-green-600">Rp {request.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Approved At</p>
                              <p className="font-medium">{request.approvedAt}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Approved By</p>
                              <p className="font-medium">{request.approvedBy}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Rejected Tab */}
              <TabsContent value="rejected" className="space-y-4">
                {withdrawalRequests.rejected.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{request.bandarName}</h3>
                            <Badge variant="destructive">Rejected</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{request.email}</p>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-muted-foreground mb-1">Amount</p>
                              <p className="font-bold">Rp {request.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Rejected At</p>
                              <p className="font-medium">{request.rejectedAt}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Rejected By</p>
                              <p className="font-medium">{request.rejectedBy}</p>
                            </div>
                          </div>

                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Rejection Reason:</p>
                            <p className="text-sm text-red-900">{request.rejectionReason}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Top Affiliates Tab */}
          <TabsContent value="affiliates">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Affiliates</CardTitle>
                <CardDescription>Affiliates dengan komisi tertinggi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAffiliates.map((affiliate) => (
                    <div key={affiliate.rank} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                          {affiliate.rank}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{affiliate.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {affiliate.referrals} referrals • {affiliate.conversionRate}% conversion rate
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          Rp {(affiliate.commission / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-xs text-muted-foreground">Total commission</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commission Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Commission Configuration</CardTitle>
                <CardDescription>Atur rate komisi affiliate dan withdrawal settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Affiliate Commission Rate (%)</label>
                    <Input type="number" defaultValue="2" step="0.1" />
                    <p className="text-xs text-muted-foreground">
                      Persentase komisi dari setiap transaksi referral
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Withdrawal (Rp)</label>
                    <Input type="number" defaultValue="100000" />
                    <p className="text-xs text-muted-foreground">
                      Minimal saldo untuk withdrawal komisi
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Withdrawal Fee (Rp)</label>
                    <Input type="number" defaultValue="2500" />
                    <p className="text-xs text-muted-foreground">
                      Biaya admin untuk setiap withdrawal
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Withdrawal per Day (Rp)</label>
                    <Input type="number" defaultValue="10000000" />
                    <p className="text-xs text-muted-foreground">
                      Maksimal withdrawal per hari
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Commission Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Withdrawal Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this withdrawal request. This will be sent to the affiliate.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea
                id="rejection-reason"
                placeholder="e.g., Insufficient balance, Invalid bank details, Suspicious activity..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setRejectDialogOpen(false);
                setRejectionReason("");
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleRejectSubmit}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
