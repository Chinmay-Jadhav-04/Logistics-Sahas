"use client";

import { useEffect, useState } from "react";
import Label from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRightToLine } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { RoleCheckByPathName } from "@/components/utils/RoleChecker";
import { ROLES } from "@/constants/roles";

export default function GOLLoginPage() {
  const [emailOrusername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState(ROLES.GOL_STAFF);
  const { user, Login } = useAuth();
  const pathName = usePathname();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await Login(emailOrusername, password, selectedRole);
      if (res) {
        localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
        localStorage.setItem("record", JSON.stringify(res));
        localStorage.setItem("role", selectedRole);
        router.push("/gol/dashboard");
      } else {
        alert("Login Unsuccessful");
      }
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/gol/dashboard");
    }
  }, [user, router]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: 'url("/cargo-ship.png")' }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GOL Login</h1>
            <p className="text-gray-600">Green Ocean Logistics Staff Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email or Username
              </Label>
              <Input
                id="email"
                type="text"
                value={emailOrusername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter your email or username"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="role"
                className="text-sm font-medium text-gray-700"
              >
                Role
              </Label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value={ROLES.GOL_STAFF}>GOL Staff</option>
                <option value={ROLES.GOL_MOD}>GOL Moderator</option>
                <option value={ROLES.ROOT}>System Administrator</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <Label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-primary hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Sign In
              <ArrowRightToLine className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need access?{" "}
              <a
                href="#"
                className="text-primary hover:text-blue-500 font-medium"
              >
                Contact Administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
