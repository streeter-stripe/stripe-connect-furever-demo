import Nav from '@/app/components/Nav';
import {useSettings} from '../hooks/useSettings';

export default function Screen({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {theme} = useSettings();

  return (
    <div className="flex grow flex-row text-primary transition-colors">
      <div
        className={`h-full w-auto grow ${theme == 'light' ? 'bg-dot-grid bg-[size:224px]' : 'bg-dot-grid-dark bg-[size:224px]'}`}
      >
        {/* Furever site container */}
        <div
          className={`origin-left overflow-hidden transition duration-500 ease-in-out md:h-screen
            ${'h-full min-h-screen w-full flex-col sm:flex-row'}
            ${theme == 'light' ? 'bg-paw-pattern bg-[size:426px]' : 'bg-screen-background'}`}
        >
          <Nav />
          <div className="mt-[74px] flex h-full grow justify-center overflow-scroll overscroll-contain p-3 pb-20 sm:ml-52 sm:mt-0 sm:mt-0 sm:p-8 lg:ml-64">
            <div className="mx-auto flex max-w-[1200px] grow flex-col gap-y-4 after:pb-8 md:gap-y-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
