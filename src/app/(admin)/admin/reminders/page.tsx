import { Metadata } from "next";
import { Bell, Send, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Payment Reminders - Admin - Arisan KU",
  description: "Manage payment reminders",
};

// Mock data
const pendingReminders = [
  { 
    id: 1, 
    user: { name: "John Doe", email: "john@example.com" },
    group: "Arisan Keluarga",
    amount: 500000,
    dueDate: "2026-02-05",
    daysOverdue: 0,
    lastReminder: null
  },
  { 
    id: 2, 
    user: { name: "Jane Smith", email: "jane@example.com" },
    group: "Arisan Kantor",
    amount: 1000000,
    dueDate: "2026-02-03",
    daysOverdue: 2,
    lastReminder: "2026-01-28"
  },
  { 
    id: 3, 
    user: { name: "Bob Johnson", email: "bob@example.com" },
    group: "Arisan RT",
    amount: 300000,
    dueDate: "2026-02-01",
    daysOverdue: 4,
    lastReminder: "2026-01-29"
  },
];

const sentReminders = [
  { 
    id: 1, 
    user: { name: "Alice Brown", email: "alice@example.com" },
    group: "Arisan Keluarga",
    amount: 500000,
    sentAt: "2026-01-30T09:00:00",
    status: "delivered"
  },
  { 
    id: 2, 
    user: { name: "Charlie Wilson", email: "charlie@example.com" },
    group: "Arisan Kantor",
    amount: 1000000,
    sentAt: "2026-01-30T08:30:00",
    status: "delivered"
  },
];

const stats = {
  pending: 15,
  sent: 42,
  overdue: 8,
  paid: 35,
};

export default function AdminRemindersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-7xl mx-auto p-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payment Reminders</h1>
            <p className="text-muted-foreground">
              Manage and send payment reminders to members
            </p>
          </div>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send All Reminders
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Sent Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Overdue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.overdue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Paid After Reminder</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.paid}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingReminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{reminder.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{reminder.user.name}</CardTitle>
                        <CardDescription>{reminder.user.email}</CardDescription>
                      </div>
                    </div>
                    {reminder.daysOverdue > 0 && (
                      <Badge variant="destructive">
                        {reminder.daysOverdue} days overdue
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Group</p>
                      <p className="font-medium">{reminder.group}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Amount Due</p>
                      <p className="font-bold text-primary">
                        Rp {reminder.amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                      <p className="font-medium">
                        {new Date(reminder.dueDate).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                  {reminder.lastReminder && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Last reminder sent: {new Date(reminder.lastReminder).toLocaleDateString("id-ID")}
                    </p>
                  )}
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {sentReminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{reminder.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{reminder.user.name}</CardTitle>
                        <CardDescription>{reminder.user.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {reminder.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Group: {reminder.group}</p>
                      <p className="text-sm font-medium">
                        Amount: Rp {reminder.amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Sent at</p>
                      <p className="text-sm font-medium">
                        {new Date(reminder.sentAt).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overdue">
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Overdue Payments</h3>
                <p className="text-muted-foreground">
                  {stats.overdue} payments are overdue and require immediate attention
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
