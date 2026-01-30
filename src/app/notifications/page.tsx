import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Notifications - Arisan KU",
  description: "View your notifications",
};

// Mock data - replace with real data from API
const notifications = [
  {
    id: 1,
    type: "success",
    title: "Pembayaran Berhasil",
    message: "Pembayaran arisan bulan ini sebesar Rp 500.000 telah berhasil diproses",
    time: "2 jam yang lalu",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "Undian Arisan",
    message: "Undian arisan Grup Keluarga akan dilakukan besok pukul 19:00 WIB",
    time: "5 jam yang lalu",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Pengingat Pembayaran",
    message: "Jatuh tempo pembayaran arisan Grup Kantor dalam 3 hari",
    time: "1 hari yang lalu",
    read: true,
  },
  {
    id: 4,
    type: "payment",
    title: "Pemenang Undian",
    message: "Selamat! Anda menjadi pemenang undian arisan Grup Keluarga periode Januari",
    time: "2 hari yang lalu",
    read: true,
  },
];

function getNotificationIcon(type: string) {
  switch (type) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case "payment":
      return <DollarSign className="h-5 w-5 text-primary" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-4xl mx-auto p-4 py-8">
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Notifikasi</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm">
                Tandai Semua Dibaca
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              Semua
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Belum Dibaca</TabsTrigger>
            <TabsTrigger value="read">Sudah Dibaca</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={notification.read ? "opacity-60" : "border-primary/20"}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">Baru</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {notifications.filter(n => !n.read).map((notification) => (
              <Card key={notification.id} className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <Badge variant="default" className="text-xs">Baru</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="read" className="space-y-3">
            {notifications.filter(n => n.read).map((notification) => (
              <Card key={notification.id} className="opacity-60">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum Ada Notifikasi</h3>
              <p className="text-muted-foreground">
                Notifikasi Anda akan muncul di sini
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
