"use client";
import React, { useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
    IconEye,
    IconEyeOff,
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-toastify";

// Define Zod schema
const SignupSchema = z
    .object({
        firstname: z.string().min(1, "First name is required"),
        lastname: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[a-z]/, "Password must contain a lowercase letter")
            .regex(/[A-Z]/, "Password must contain an uppercase letter")
            .regex(/[0-9]/, "Password must contain a number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const SignupFormDemo = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = SignupSchema.safeParse(formData);

        if (!result.success) {
            const errors = result.error.errors.map((err) => err.message);
            errors.forEach((err) => toast.error(err));
            return;
        }

        console.log("Form data:", formData);
        toast.success("Signup successful!");
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input
                            id="firstname"
                            placeholder="Tyler"
                            type="text"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input
                            id="lastname"
                            placeholder="Durden"
                            type="text"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 relative">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div
                        className="absolute right-2 top-7 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <IconEyeOff className="h-5 w-5 text-neutral-500" />
                        ) : (
                            <IconEye className="h-5 w-5 text-neutral-500" />
                        )}
                    </div>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 relative">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <div
                        className="absolute right-2 top-7 cursor-pointer"
                        onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                        }
                    >
                        {showConfirmPassword ? (
                            <IconEyeOff className="h-5 w-5 text-neutral-500" />
                        ) : (
                            <IconEye className="h-5 w-5 text-neutral-500" />
                        )}
                    </div>
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <SocialLoginButton icon={IconBrandGithub} label="GitHub" />
                    <SocialLoginButton icon={IconBrandGoogle} label="Google" />
                    <SocialLoginButton
                        icon={IconBrandOnlyfans}
                        label="OnlyFans"
                    />
                </div>
            </form>
            <div className="mt-4">
                <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="text-neutral-700 dark:text-neutral-300 font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

const SocialLoginButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <button
        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="button"
    >
        <Icon className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            {label}
        </span>
        <BottomGradient />
    </button>
);

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default SignupFormDemo;
