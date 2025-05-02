'use client';

import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Home as HomeIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Dog as PetsIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FureverLogo from '@/public/furever_logo.png';
import * as React from 'react';

const navigationMenuItems = [
  {
    label: 'Home',
    href: '/home',
    icon: HomeIcon,
    paths: [],
  },
  {
    label: 'Pets',
    href: '/pets',
    icon: PetsIcon,
    paths: [],
  },
  {
    label: 'Payments',
    href: '/payments',
    icon: WalletIcon,
    paths: [],
  },
  {
    label: 'Payouts',
    href: '/payouts',
    icon: CoinsIcon,
    paths: [],
  },
  {
    label: 'Account',
    href: '/settings',
    icon: SettingsIcon,
    paths: ['/settings/documents', '/settings/tax'],
  },
];

const Nav = () => {
  const pathname = usePathname();
  const {data: session} = useSession();

  const stripeAccount = session?.user?.stripeAccount;

  const [showMobileNavItems, setShowMobileNavItems] = React.useState(false);

  return (
    <div className="border-gray-border fixed z-50 w-full flex-col border-b bg-screen-foreground sm:fixed sm:flex sm:h-screen sm:w-52 sm:border-b-0 sm:border-r sm:p-1 lg:w-64 lg:p-3">
      <div className="flex items-center justify-between p-3 sm:mb-4">
        <Link href="/home">
          <div className="flex items-center gap-3 text-xl font-bold text-primary">
            <Image
              src={FureverLogo}
              alt="Furever Logo"
              className="h-9 w-9 sm:h-10 sm:w-10"
              sizes="100px"
              priority
            />
            Furever
          </div>
        </Link>
        <Button
          variant="ghost"
          className="sm:hidden"
          onClick={() => setShowMobileNavItems(!showMobileNavItems)}
        >
          <MenuIcon />
        </Button>
      </div>
      <nav
        className={`${showMobileNavItems ? 'flex' : 'hidden'} w-full flex-1 p-2 pb-3 shadow-xl transition sm:flex sm:p-0 sm:shadow-none`}
      >
        <ul className="w-full flex-col">
          {navigationMenuItems.map((item) => (
            <li key={item.label} className="p-1">
              <Link href={item.href}>
                <Button
                  className={`w-full justify-start text-lg text-primary hover:bg-accent-subdued ${
                    pathname === item.href || item.paths.includes(pathname)
                      ? 'bg-accent-subdued text-accent'
                      : 'bg-foreground'
                  }`}
                  onClick={() => setShowMobileNavItems(false)}
                  tabIndex={-1}
                >
                  <item.icon
                    className="mr-2"
                    size={20}
                    color={`${
                      pathname === item.href || item.paths.includes(pathname)
                        ? 'var(--accent)'
                        : 'var(--primary)'
                    }`}
                  />{' '}
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
