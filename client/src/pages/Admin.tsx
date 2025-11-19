import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Download, Search, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Rsvp } from "@shared/schema";
import { useLocation } from "wouter";

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      return await apiRequest("POST", "/api/admin/login", { password });
    },
    onSuccess: () => {
      onSuccess();
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans le panneau d'administration",
      });
    },
    onError: () => {
      toast({
        title: "Erreur de connexion",
        description: "Mot de passe incorrect",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-serif text-3xl text-center">
            Administration
          </CardTitle>
          <CardDescription className="text-center">
            Gestion des confirmations de présence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe admin"
                required
                data-testid="input-admin-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
              data-testid="button-admin-login"
            >
              {loginMutation.isPending ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: rsvps = [], isLoading } = useQuery<Rsvp[]>({
    queryKey: ["/api/rsvp"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/");
      toast({
        title: "Déconnexion réussie",
      });
    },
  });

  const filteredRsvps = rsvps.filter((rsvp) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      rsvp.fullName.toLowerCase().includes(searchLower) ||
      rsvp.email.toLowerCase().includes(searchLower) ||
      (rsvp.phone && rsvp.phone.toLowerCase().includes(searchLower))
    );
  });

  const totalGuests = rsvps.reduce((sum, rsvp) => sum + rsvp.numberOfGuests, 0);

  const exportToCSV = () => {
    const headers = ["Nom complet", "Email", "Téléphone", "Nombre d'invités", "Restrictions alimentaires", "Message", "Date de confirmation"];
    const rows = rsvps.map((rsvp) => [
      rsvp.fullName,
      rsvp.email,
      rsvp.phone || "",
      rsvp.numberOfGuests,
      rsvp.dietaryRestrictions || "",
      rsvp.message || "",
      format(new Date(rsvp.createdAt), "dd/MM/yyyy HH:mm", { locale: fr }),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `rsvps-ahmed-lyna-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast({
      title: "Export réussi",
      description: `${rsvps.length} confirmations exportées`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl md:text-3xl">
            Administration - Ahmed & Lyna
          </h1>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Confirmations
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-rsvps">
                {rsvps.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {rsvps.length === 0 ? "Aucune confirmation" : rsvps.length === 1 ? "confirmation reçue" : "confirmations reçues"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total invités
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-guests">
                {totalGuests}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalGuests === 0 ? "Aucun invité" : totalGuests === 1 ? "personne attendue" : "personnes attendues"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Moyenne
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rsvps.length > 0 ? (totalGuests / rsvps.length).toFixed(1) : "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                invités par confirmation
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Liste des confirmations</CardTitle>
                <CardDescription>
                  Gérez toutes les confirmations de présence
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                    data-testid="input-search-rsvps"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={exportToCSV}
                  disabled={rsvps.length === 0}
                  data-testid="button-export-csv"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredRsvps.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {searchTerm ? "Aucun résultat trouvé" : "Aucune confirmation pour le moment"}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-rsvps">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 font-medium">Nom</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Téléphone</th>
                      <th className="pb-3 font-medium text-center">Invités</th>
                      <th className="pb-3 font-medium">Restrictions</th>
                      <th className="pb-3 font-medium">Message</th>
                      <th className="pb-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="border-b last:border-0" data-testid={`rsvp-row-${rsvp.id}`}>
                        <td className="py-3 font-medium">{rsvp.fullName}</td>
                        <td className="py-3 text-sm">{rsvp.email}</td>
                        <td className="py-3 text-sm">{rsvp.phone || "-"}</td>
                        <td className="py-3 text-center font-semibold">{rsvp.numberOfGuests}</td>
                        <td className="py-3 text-sm max-w-[200px] truncate" title={rsvp.dietaryRestrictions || "-"}>
                          {rsvp.dietaryRestrictions || "-"}
                        </td>
                        <td className="py-3 text-sm max-w-[250px] truncate" title={rsvp.message || "-"}>
                          {rsvp.message || "-"}
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {format(new Date(rsvp.createdAt), "dd/MM/yyyy", { locale: fr })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { data: authCheck, isLoading } = useQuery<{ isAuthenticated: boolean }>({
    queryKey: ["/api/admin/check"],
    retry: false,
  });

  useEffect(() => {
    if (authCheck !== undefined) {
      setIsAuthenticated(authCheck.isAuthenticated);
    }
  }, [authCheck]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm
        onSuccess={() => {
          setIsAuthenticated(true);
          queryClient.invalidateQueries({ queryKey: ["/api/rsvp"] });
        }}
      />
    );
  }

  return <AdminDashboard />;
}
