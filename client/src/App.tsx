import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import ProductsPage from "@/pages/products";
import DealsPage from "@/pages/deals";
import AboutPage from "@/pages/about";
import CategoriesPage from "@/pages/categories";
import ContactPage from "@/pages/contact";
import ProductRequestPage from "@/pages/product-request";
import NotFound from "@/pages/not-found";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/deals" component={DealsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/request-product" component={ProductRequestPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
