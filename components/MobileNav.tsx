'use client';
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
 
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";



const MobileNav = () => {
    const pathName= usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild><Image src='icons/hamburger.svg' width={36} height={36} alt="Open" className="cursor-pointer sm:hidden"/></SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
        <Link href='/' className='flex items-center gap-1'>
        <Image src='/icons/logo.svg' width={32} height={32} alt='zoomerlogo' className='max-sm:size-10' />
        <SheetTitle className='text-[26px] font-extrabold text-white  '>Zoomeer</SheetTitle>
       </Link> 
       <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
        <SheetClose asChild>
            <section className="flex h-full gap-6 p-16 text-white flex-col">
            {sidebarLinks.map((link)=>{
                const isActive=pathName===link.route;
                return(
                    <SheetClose asChild key={link.route}>
                    <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60',{
                        'bg-blue-1':isActive,
                    })}>
                        <img src={link.imgUrl} alt={link.label} width={20} height={20}/>

                        <p className=' font-semibold '>{link.label}</p>
                    </Link>
                    </SheetClose>
                )
            })}
            </section>
        </SheetClose>
       </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
