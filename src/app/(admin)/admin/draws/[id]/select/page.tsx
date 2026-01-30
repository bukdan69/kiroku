"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Trophy, Users, DollarSign, Calendar,
  Shuffle, CheckCircle, AlertCircle, Lock, Unlock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function WinnerSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const drawId = params.id as string;

  const [selectionStep, setSelectionStep] = useState<"ready" | "committing" | "revealing" | "completed">("ready");
  const [commitHash, setCommitHash] = useState<string | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<any>(null);

  // Mock data
  const draw = {
    id: drawId,
    group: "Arisan RT 05 Blok A",
    period: 3,
    totalPeriods: 10,
    drawDate: "2026-02-05",
    prizeAmount: 4500000,
    platformFee: 225000,
    adminFee: 112500,
    winnerAmount: 4162500,
  };

  const eligibleMembers = [
    { id: "1", name: "Budi Santoso", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
    { id: "2", name: "Siti Aminah", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
    { id: "3", name: "Ahmad Yani", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
    { id: "4", name: "Dewi Lestari", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
    { id: "5", name: "Rudi Hartono", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
    { id: "6", name: "Ani Wijaya", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
    { id: "7", name: "Bambang Susilo", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
    { id: "8", name: "Citra Dewi", hasPaid: true, hasLoggedIn: true, previousWins: 0 },
  ];

  const handleCommit = () => {
    setSelectionStep("committing");
    // Simulate commit phase
    setTimeout(() => {
      const hash = `0x${Math.random().toString(16).substring(2, 18)}`;
      setCommitHash(hash);
      setSelectionStep("revealing");
    }, 2000);
  };

  const handleReveal = () => {
    // Simulate reveal phase and random selection
    const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
    const winner = eligibleMembers[randomIndex];
    setSelectedWinner(winner);
    setSelectionStep("completed");
  };

  const handleConfirm = async () => {
    // Save to database and redirect
    alert("Winner confirmed! Redirecting...");
    router.push("/admin/dashboard?tab=draws");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/admin/dashboard?tab=draws" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Undian
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Winner Selection</h1>
                <p className="text-sm text-muted-foreground">{draw.group} - Period {draw.period}</p>
              </div>
            </div>

            <Badge className="bg-purple-100 text-purple-800">
              <Calendar className="w-3 h-3 mr-1" />
              {draw.drawDate}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Prize Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Prize Pool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                Rp {(draw.prizeAmount / 1000000).toFixed(1)}M
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Platform Fee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(draw.platformFee / 1000).toFixed(0)}K
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Admin Fee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(draw.adminFee / 1000).toFixed(0)}K
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Winner Gets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                Rp {(draw.winnerAmount / 1000000).toFixed(2)}M
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selection Process */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left - Eligible Members */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Eligible Members</CardTitle>
                <CardDescription>
                  {eligibleMembers.length} members eligible for this draw
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {eligibleMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedWinner?.id === member.id 
                          ? "border-purple-500 bg-purple-50" 
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs bg-green-50">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Paid
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-blue-50">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Logged In
                            </Badge>
                          </div>
                        </div>
                        {selectedWinner?.id === member.id && (
                          <Trophy className="w-8 h-8 text-purple-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Selection Process */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Selection Process</CardTitle>
                <CardDescription>
                  Commit-Reveal Fair Selection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Step 1: Ready */}
                <div className={`p-4 border rounded-lg ${
                  selectionStep === "ready" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectionStep === "ready" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}>
                      1
                    </div>
                    <p className="font-semibold">Ready</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-11">
                    All members eligible
                  </p>
                </div>

                {/* Step 2: Commit */}
                <div className={`p-4 border rounded-lg ${
                  selectionStep === "committing" ? "border-yellow-500 bg-yellow-50" : 
                  selectionStep === "revealing" || selectionStep === "completed" ? "border-green-500 bg-green-50" :
                  "border-gray-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectionStep === "committing" ? "bg-yellow-500 text-white" :
                      selectionStep === "revealing" || selectionStep === "completed" ? "bg-green-500 text-white" :
                      "bg-gray-200"
                    }`}>
                      {selectionStep === "revealing" || selectionStep === "completed" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        "2"
                      )}
                    </div>
                    <p className="font-semibold">Commit</p>
                  </div>
                  {commitHash && (
                    <div className="ml-11">
                      <p className="text-xs text-muted-foreground mb-1">Hash:</p>
                      <p className="text-xs font-mono bg-white p-2 rounded border">
                        {commitHash}
                      </p>
                    </div>
                  )}
                </div>

                {/* Step 3: Reveal */}
                <div className={`p-4 border rounded-lg ${
                  selectionStep === "revealing" ? "border-purple-500 bg-purple-50" :
                  selectionStep === "completed" ? "border-green-500 bg-green-50" :
                  "border-gray-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectionStep === "revealing" ? "bg-purple-500 text-white" :
                      selectionStep === "completed" ? "bg-green-500 text-white" :
                      "bg-gray-200"
                    }`}>
                      {selectionStep === "completed" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        "3"
                      )}
                    </div>
                    <p className="font-semibold">Reveal</p>
                  </div>
                  {selectedWinner && (
                    <div className="ml-11">
                      <p className="text-sm font-semibold text-purple-900">
                        🏆 {selectedWinner.name}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-2">
                  {selectionStep === "ready" && (
                    <Button 
                      className="w-full" 
                      onClick={handleCommit}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Start Commit Phase
                    </Button>
                  )}

                  {selectionStep === "committing" && (
                    <Button className="w-full" disabled>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Committing...
                    </Button>
                  )}

                  {selectionStep === "revealing" && (
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700" 
                      onClick={handleReveal}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Reveal Winner
                    </Button>
                  )}

                  {selectionStep === "completed" && (
                    <>
                      <Alert className="border-green-500 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-900">
                          Winner selected successfully!
                        </AlertDescription>
                      </Alert>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700" 
                        onClick={handleConfirm}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm & Announce
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSelectionStep("ready");
                          setCommitHash(null);
                          setSelectedWinner(null);
                        }}
                      >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Redraw
                      </Button>
                    </>
                  )}
                </div>

                {/* Info */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Commit-Reveal ensures fair and transparent winner selection. 
                    The process cannot be manipulated once started.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
