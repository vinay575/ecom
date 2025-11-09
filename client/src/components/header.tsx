import { ShoppingCart, Menu, LogOut, Package, Tag, Info, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchDropdown } from "./search-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, isAuthenticated } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2" data-testid="link-home">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-purple-600">
                <span className="text-lg font-bold text-white">D</span>
              </div>
              <span className="hidden font-display text-xl font-bold sm:inline bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DigitalHub
              </span>
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              <a href="/products" className="text-sm font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2 flex items-center gap-1" data-testid="link-products">
                <Package className="h-4 w-4" />
                Products
              </a>
              <a href="/deals" className="text-sm font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2" data-testid="link-deals">
                Deals
              </a>
              <a href="/contact" className="text-sm font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2 flex items-center gap-1" data-testid="link-contact">
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </nav>
          </div>

          <div className="hidden flex-1 max-w-md lg:flex">
            <SearchDropdown />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-search-mobile">
              <Search className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  0
                </Badge>
              </Button>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || undefined} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    {user?.name || user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = '/dashboard'} data-testid="menu-dashboard">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/orders'} data-testid="menu-orders">
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/wishlist'} data-testid="menu-wishlist">
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = '/api/logout'} data-testid="menu-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => window.location.href = '/auth'} data-testid="button-login">
                Login
              </Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
