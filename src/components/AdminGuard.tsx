"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase animate-pulse">
          VERIFYING CLEARANCE...
        </p>
      </div>
    );
  }

  // TEMPORARILY BYPASSED for development/showcase purposes
  // const ADMIN_EMAIL = 'arcopus.admin@gmail.com';
  // 
  // if (!session?.user || session.user.email !== ADMIN_EMAIL) {
  //   return (
  //     <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center space-y-6 text-center">
  //       <motion.div 
  //         initial={{ opacity: 0, scale: 0.9 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center border border-brand-red/30"
  //       >
  //         <ShieldAlert className="w-8 h-8 text-brand-red" />
  //       </motion.div>
  //       
  //       <div className="space-y-2">
  //         <h1 className="font-syne text-2xl font-bold tracking-widest text-white uppercase">
  //           RESTRICTED ACCESS
  //         </h1>
  //         <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase max-w-sm mx-auto">
  //           UNAUTHORIZED IDENTIFICATION. ONLY ARC OPUS ADMINISTRATORS MAY PROCEED.
  //         </p>
  //       </div>
  //
  //       <Link 
  //         href="/"
  //         className="mt-4 border border-white/20 px-8 py-3 rounded-full font-mono text-[10px] tracking-widest text-white uppercase hover:bg-white hover:text-black transition-colors"
  //       >
  //         RETURN TO SAFETY
  //       </Link>
  //     </div>
  //   );
  // }

  return <>{children}</>;
};
