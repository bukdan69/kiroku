import { Metadata } from "next";
import { CheckCircle, XCircle, Clock, FileText, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "KYC Review - Admin - Arisan KU",
  description: "Review KYC verifications",
};

// Mock data
const kycRequests = [
  { 
    id: 1, 
    user: { name: "John Doe", email: "john@example.com" },
    idType: "KTP",
    idNumber: "3201234567890001",
    status: "pending",
    submittedAt: "2026-01-29T10:30:00",
    documents: ["ktp.jpg", "selfie.jpg"]
  },
  { 
    id: 2, 
    user: { name: "Jane Smith", email: "jane@example.com" },
    idType: "KTP",
    idNumber: "3201234567890002",
    status: "pending",
    submittedAt: "2026-01-29T09:15:00",
    documents: ["ktp.jpg", "selfie.jpg"]
  },
  { 
    id: 3, 
    user: { name: "Bob Johnson", email: "bob@example.com" },
    idType: "Passport",
    idNumber: "A12345678",
    status: "pending",
    submittedAt: "2026-01-28T14:20:00",
    documents: ["passport.jpg", "selfie.jpg"]
  },
];

const stats = {
  pending: 23,
  approved: 1105,
  rejected: 42,
  total: 1170,
};

export default function AdminKycPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">KYC Review</h1>
          <p className="text-muted-foreground">
            Review and approve user identity verifications
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.approved.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Rejected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {kycRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{request.user.name}</CardTitle>
                        <CardDescription>{request.user.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ID Type</p>
                      <p className="font-medium">{request.idType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ID Number</p>
                      <p className="font-medium">{request.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                      <p className="font-medium">
                        {new Date(request.submittedAt).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Documents</p>
                      <div className="flex gap-2">
                        {request.documents.map((doc, index) => (
                          <Badge key={index} variant="secondary">
                            <FileText className="mr-1 h-3 w-3" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Approved KYC to Display</h3>
                <p className="text-muted-foreground">
                  Approved KYC verifications will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardContent className="p-12 text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Rejected KYC to Display</h3>
                <p className="text-muted-foreground">
                  Rejected KYC verifications will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
