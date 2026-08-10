import { AbmSidebar, AbmMobileBar } from "@/components/shell/AbmSidebar";

export default function AbmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <AbmSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AbmMobileBar />
        <main className="mx-auto w-full max-w-[1040px] flex-1 px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
