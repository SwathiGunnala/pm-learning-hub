import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Sparkles, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginValues) =>
      apiRequest("POST", "/api/auth/login", data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      onSuccess();
    },
    onError: async (err: any) => {
      let message = "Invalid email or password";
      try {
        const body = await err.response?.json?.();
        if (body?.message) message = body.message;
      } catch {}
      toast({ title: "Sign in failed", description: message, variant: "destructive" });
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          data-testid="input-login-email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            data-testid="input-login-password"
            {...form.register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword((v) => !v)}
            data-testid="button-toggle-password"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={mutation.isPending}
        data-testid="button-login-submit"
      >
        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  );
}

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterValues) =>
      apiRequest("POST", "/api/auth/register", data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      onSuccess();
    },
    onError: async (err: any) => {
      let message = "Could not create account. Please try again.";
      try {
        const body = await err.response?.json?.();
        if (body?.message) message = body.message;
      } catch {}
      toast({ title: "Registration failed", description: message, variant: "destructive" });
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="reg-first">First name</Label>
          <Input
            id="reg-first"
            placeholder="Jane"
            data-testid="input-register-firstname"
            {...form.register("firstName")}
          />
          {form.formState.errors.firstName && (
            <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="reg-last">Last name</Label>
          <Input
            id="reg-last"
            placeholder="Smith"
            data-testid="input-register-lastname"
            {...form.register("lastName")}
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="you@example.com"
          data-testid="input-register-email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="reg-password">Password</Label>
        <div className="relative">
          <Input
            id="reg-password"
            type={showPassword ? "text" : "password"}
            placeholder="Min 8 characters"
            data-testid="input-register-password"
            {...form.register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="reg-confirm">Confirm password</Label>
        <Input
          id="reg-confirm"
          type={showPassword ? "text" : "password"}
          placeholder="Repeat password"
          data-testid="input-register-confirm"
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={mutation.isPending}
        data-testid="button-register-submit"
      >
        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
}

export default function AuthPage() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<"login" | "register">("login");

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg">Product Learning Hub</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to track your progress, unlock exercises, and build your PM skills.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2 mb-6" data-testid="tabs-auth">
                  <TabsTrigger value="login" data-testid="tab-signin">Sign In</TabsTrigger>
                  <TabsTrigger value="register" data-testid="tab-register">Create Account</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm onSuccess={handleSuccess} />
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    No account yet?{" "}
                    <button
                      className="text-primary underline-offset-4 hover:underline"
                      onClick={() => setTab("register")}
                      data-testid="link-switch-to-register"
                    >
                      Create one free
                    </button>
                  </p>
                </TabsContent>
                <TabsContent value="register">
                  <RegisterForm onSuccess={handleSuccess} />
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account?{" "}
                    <button
                      className="text-primary underline-offset-4 hover:underline"
                      onClick={() => setTab("login")}
                      data-testid="link-switch-to-login"
                    >
                      Sign in
                    </button>
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
