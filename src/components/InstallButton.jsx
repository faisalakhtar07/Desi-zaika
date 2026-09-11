import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'
import { setupInstallPrompt, handleInstallClick } from '../services/pwaRegister'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Setup install prompt
    setupInstallPrompt((prompt) => {
      setDeferredPrompt(prompt)
      setShowInstall(true)
    })
  }, [])

  const handleClick = () => {
    handleInstallClick(deferredPrompt)
    setShowInstall(false)
  }

  if (!showInstall || isInstalled) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Download className="w-6 h-6 text-[#2e0003] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-[#2e0003] text-sm">Install Desi Zaika</h3>
            <p className="text-gray-600 text-xs mt-1">
              Add to your home screen for quick access
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowInstall(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setShowInstall(false)}
          className="flex-1 px-3 py-1 text-gray-600 text-xs font-medium hover:bg-gray-100 rounded"
        >
          Not now
        </button>
        <button
          onClick={handleClick}
          className="flex-1 px-3 py-1 bg-[#2e0003] text-[#D8cfbc] text-xs font-medium rounded hover:bg-[#4a0a10] transition"
        >
          Install
        </button>
      </div>
    </div>
  )
}
