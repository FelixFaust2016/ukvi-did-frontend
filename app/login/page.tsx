import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { logo } from "@/assets/webp";
import { Logo } from "@/components/containers";

export default function Login() {
  return (
    <section className="w-full h-screen flex justify-center items-center px-2">
      <Card className="max-w-md w-full">
        <CardHeader>
         <Logo className="m-auto"/>
          <CardTitle className="text-center mt-2">UKVI Issuer Portal</CardTitle>
          <CardDescription className="text-center">
            Login with your DID credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-1.5 mt-5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <Button className="w-full mt-10">Sign in</Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-center text-xs">
            Secured by Uk Government Authentication Service
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
