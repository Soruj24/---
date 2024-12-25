'use client';
import { useState } from "react";
import { ShoppingCart, Menu, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Profile } from "./Profile";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-primary dark:text-gray-200">
                        <Link href={'/'}>ShopEase</Link>
                    </div>

                    {/* Categories (Desktop Only) */}
                    <nav className="hidden lg:flex space-x-8">
                        {["Home", "Shop", "Categories", "About", "Contact"].map((item) => (
                            <Button variant="ghost" key={item} className="hover:text-primary dark:hover:text-gray-200">
                                {item}
                            </Button>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <div className="flex-1 hidden lg:flex items-center mx-4">
                        <Input
                            placeholder="Search products..."
                            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                        <Button variant="ghost" className="ml-2">
                            <Search className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        </Button>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" className="relative">
                            <ShoppingCart className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                            <span className="absolute top-0 right-0 block h-4 w-4 text-xs text-center text-white bg-red-500 rounded-full">
                                3
                            </span>
                        </Button>


                        {/* User Dropdown */}

                        <Profile />

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            {theme === "light" ? (
                                <Moon className="h-6 w-6 text-gray-800" />
                            ) : (
                                <Sun className="h-6 w-6 text-gray-200" />
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="lg:hidden space-y-2 pb-4">
                        {[
                            "Home",
                            "Shop",
                            "Categories",
                            "About",
                            "Contact"
                        ].map((item) => (
                            <Button
                                variant="ghost"
                                key={item}
                                className="block w-full text-left hover:text-primary dark:hover:text-gray-200"
                            >
                                {item}
                            </Button>
                        ))}
                        <div className="flex items-center mt-4">
                            <Input
                                placeholder="Search products..."
                                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                            />
                            <Button variant="ghost" className="ml-2">
                                <Search className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                            </Button>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;
