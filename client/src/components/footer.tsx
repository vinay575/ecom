import { SiGithub, SiX, SiFacebook, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">D</span>
              </div>
              <span className="font-display text-xl font-bold">DigitalHub</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Premium digital products marketplace for designers and developers.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-social-twitter">
                <SiX className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-github">
                <SiGithub className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-facebook">
                <SiFacebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-linkedin">
                <SiLinkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-ui-kits">UI Kits</button></li>
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-templates">Templates</button></li>
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-plugins">Plugins</button></li>
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-tools">Tools</button></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-help-center">Help Center</button></li>
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-documentation">Documentation</button></li>
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">Contact Us</button></li>
              <li><button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get the latest products and deals delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
          <div>© 2026 DigitalHub. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <button className="hover:text-foreground transition-colors" data-testid="link-privacy">Privacy Policy</button>
            <button className="hover:text-foreground transition-colors" data-testid="link-terms">Terms of Service</button>
            <button className="hover:text-foreground transition-colors" data-testid="link-cookies">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
