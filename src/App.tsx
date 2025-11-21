import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { Web3Provider } from "./contexts/Web3Context";
import OwnerBootstrap from "./components/admin/OwnerBootstrap";

// Import organized route modules
import { 
  CourtRoutes, 
  OfficerRoutes, 
  ForensicRoutes, 
  LawyerRoutes, 
  SharedRoutes 
} from "./routes";

// Debug components (should be behind feature flag in production)
import RouteDebugInfo from "./components/admin/debug/RouteDebugInfo";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Web3Provider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />

              {/* Bootstrap/Setup route for contract owner */}
              <Route
                path="/bootstrap"
                element={
                  <Layout>
                    <OwnerBootstrap />
                  </Layout>
                }
              />

              {/* Debug route - should be behind feature flag in production */}
              {import.meta.env.MODE === "development" && (
                <Route
                  path="/debug/routes"
                  element={
                    <Layout>
                      <RouteDebugInfo />
                    </Layout>
                  }
                />
              )}

              {/* Shared Routes - accessible by all authenticated users */}
              {SharedRoutes()}

              {/* Role-specific Routes */}
              {CourtRoutes()}
              {OfficerRoutes()}
              {ForensicRoutes()}
              {LawyerRoutes()}

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Web3Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;