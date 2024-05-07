'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href='/' className='cursor-pointer mb-12 items-center gap-2 flex'>
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='WePay'
            className='size-[24px] max-xl:size-14'
          />
          <h1 className='sidebar-logo'>WePay</h1>
        </Link>
        {sidebarLinks.map((s) => {
          const isActive =
            pathname === s.route || pathname.startsWith(`${s.route}/`);
          return (
            <Link
              href={s.route}
              key={s.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className='relative size-6'>
                <Image
                  src={s.imgURL}
                  alt={s.label}
                  fill
                  className={cn({ 'brightness-[3] invert-0': isActive })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>
                {s.label}
              </p>
            </Link>
          );
        })}
        USER
      </nav>
      <Footer user={user} />
    </section>
  );
};
export default Sidebar;
