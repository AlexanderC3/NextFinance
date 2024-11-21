"use client"

import React, { useState } from 'react'
import { Logo, LogoMobile } from './Logo'
import { navLinks } from '@/constants/navlinks'
import NavbarLink from './NavbarLink'
import { UserButton } from '@clerk/nextjs'
import { ThemeSwitchBtn } from './ThemeSwitchBtn'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

function Navbar() {
  return(
    <>
        <DesktopNavbar/>
        <MobileNavbar/>
    </>
  )
}

function DesktopNavbar() {
    return(
        <div className='hidden border-separate border-b bg-background md:block'>
            <nav className='container flex items-center justify-between px-8 md:m-auto'>
                <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
                    <Logo/>
                    <div className='flex h-full'>
                        {navLinks.map(link => (
                            <NavbarLink key={link.label} link={link.link} label={link.label} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                        <ThemeSwitchBtn/>
                        <UserButton />
                </div>
            </nav>
        </div>
    )
}

function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    return(
        <div className='block border-separate bg-background md:hidden'>
            <nav className='container flex items-center justify-between px-8'>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-[400px] sm:w-[540px]' side="left">
                        <div className='hidden'>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>Menu</SheetDescription>
                        </div>
                        <Logo/>
                        <div className="flex flex-col gap-1 pt-4">
                            {navLinks.map(link => (
                                <NavbarLink key={link.label} link={link.link} label={link.label} onClick={() => setIsOpen(prev => !prev)} />
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
                    <LogoMobile/>
                </div>
                <div className='flex items-center gap-2 justify-center'>
                            <ThemeSwitchBtn/>
                            <UserButton/>
                        </div>
            </nav>
        </div>
    )
}

export default Navbar