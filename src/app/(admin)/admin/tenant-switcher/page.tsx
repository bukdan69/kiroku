import { Metadata } from "next";
import { Building2, Users, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tenant Switcher - Admin - Arisan KU",
  description: "Switch between tenants",
};

// Mock data
const tenants = [
  { 
    id: 1, 
    name: "Arisan KU Main",
    domain: "arisanku.com",
    status: "active",
    users: 1247,
    groups: 45,
    revenue: 125000000,
    isCurrent: true
  },
  { 
    id: 2, 
    name: "Arisan KU Enterprise",
    domain: "enterprise.arisanku.com",
    status: "active",
    users: 523,
    groups: 18,
    revenue: 52000000,
    isCurrent: false
  },
  { 
    id: 3, 
    name: "Arisan KU Demo",
    domain: "demo.arisanku.com",
    status: "active",
    users: 45,
    groups: 5,
    revenue: 5000000,
    isCurrent: false
  },
  { 
    id: 4, 
    name: "Arisan KU Staging",
    domain: "staging.arisanku.com",
    status: "maintenance",
    users: 12,
    groups: 2,
    revenue: 0,
    isCurrent: false
  },
];

export default function AdminTenantSwitcherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-6xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tenant Switcher</h1>
          <p className="text-muted-foreground">
            Switch between different tenant environments
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tenants.map((tenant) => (
            <Card key={tenant.id} className={tenant.isCurrent ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tenant.name}</CardTitle>
                      <CardDescription>{tenant.domain}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={tenant.status === "active" ? "default" : "secondary"}>
                      {tenant.status}
                    </Badge>
                    {tenant.isCurrent && (
                      <Badge variant="outline">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Current
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-accent/50 rounded-lg">
                    <Users className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-2xl font-bold">{tenant.users.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Users</p>
                  </div>
                  <div className="text-center p-3 bg-accent/50 rounded-lg">
                    <Building2 className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-2xl font-bold">{tenant.groups}</p>
                    <p className="text-xs text-muted-foreground">Groups</p>
                  </div>
                  <div className="text-center p-3 bg-accent/50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-lg font-bold">
                      {(tenant.revenue / 1000000).toFixed(0)}M
                    </p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>

                {!tenant.isCurrent && tenant.status === "active" && (
                  <Button className="w-full">
                    Switch to {tenant.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {tenant.isCurrent && (
                  <Button variant="outline" className="w-full" disabled>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Currently Active
                  </Button>
                )}

                {tenant.status === "maintenance" && (
                  <Button variant="outline" className="w-full" disabled>
                    Under Maintenance
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About Multi-Tenancy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Multi-tenancy allows you to manage multiple isolated environments from a single admin interface. 
              Each tenant has its own database, users, and configuration while sharing the same codebase.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium mb-1">Data Isolation</p>
                <p className="text-sm text-muted-foreground">
                  Each tenant's data is completely isolated
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium mb-1">Custom Domains</p>
                <p className="text-sm text-muted-foreground">
                  Each tenant can have its own domain
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium mb-1">Independent Config</p>
                <p className="text-sm text-muted-foreground">
                  Separate settings for each environment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
