import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone ||
                              document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // For Chrome Ubuntu, sometimes the event doesn't fire immediately
    // So we set a fallback timer to show install option
    const fallbackTimer = setTimeout(() => {
      if (!isStandalone && !deferredPrompt) {
        console.log('Fallback: Setting installable to true');
        setIsInstallable(true);
      }
    }, 3000);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const installPWA = async () => {
    console.log('Install PWA called');
    
    if (deferredPrompt) {
      console.log('Using deferred prompt');
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('PWA install accepted');
        } else {
          console.log('PWA install dismissed');
        }
        
        setDeferredPrompt(null);
        setIsInstallable(false);
      } catch (error) {
        console.error('Error during PWA install:', error);
      }
    } else {
      // Fallback for Chrome Ubuntu - show manual instructions
      console.log('No deferred prompt, showing manual instructions');
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (userAgent.includes('chrome')) {
        alert(
          'Untuk menginstall aplikasi ini:\n\n' +
          '1. Klik menu Chrome (⋮) di pojok kanan atas\n' +
          '2. Pilih "Install Yamaha Loyalty Program"\n' +
          '3. Atau cari opsi "Add to Home screen"\n\n' 
        );
      } else {
        alert(
          'Untuk menginstall aplikasi ini, gunakan browser Chrome dan:\n\n' +
          '1. Klik menu Chrome (⋮)\n' +
          '2. Pilih "Install Yamaha Loyalty Program"\n' +
          '3. Atau "Add to Home screen"'
        );
      }
    }
  };

  return { 
    isInstallable: isInstallable && !isStandalone, 
    installPWA,
    isStandalone 
  };
}
