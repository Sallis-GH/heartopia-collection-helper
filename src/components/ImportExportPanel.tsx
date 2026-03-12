import { useRef, useState } from 'react'
import { DownloadIcon, UploadIcon, RefreshIcon } from './Icons'

interface ImportExportPanelProps {
  onExport: () => void
  onImport: (json: string) => boolean
  onReset: () => void
}

export function ImportExportPanel({ onExport, onImport, onReset }: ImportExportPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      const success = onImport(result)
      setImportStatus(success ? 'success' : 'error')
      setTimeout(() => setImportStatus('idle'), 3000)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    if (showConfirm) {
      onReset()
      setShowConfirm(false)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 5000)
    }
  }

  const btnStyle: React.CSSProperties = {
    width: 34,
    height: 34,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.6)',
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={onExport}
        style={btnStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(107, 159, 126, 0.3)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
        }}
        title="Export Data"
      >
        <DownloadIcon />
      </button>

      <button
        onClick={handleImport}
        style={btnStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(148, 133, 194, 0.3)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
        }}
        title="Import Data"
      >
        <UploadIcon />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleReset}
        style={{
          ...btnStyle,
          backgroundColor: showConfirm ? 'rgba(196, 100, 78, 0.8)' : btnStyle.backgroundColor,
          color: showConfirm ? 'rgba(255,255,255,0.95)' : btnStyle.color,
          border: showConfirm ? '1px solid rgba(196, 100, 78, 0.6)' : btnStyle.border,
        }}
        onMouseEnter={(e) => {
          if (!showConfirm) {
            e.currentTarget.style.backgroundColor = 'rgba(196, 100, 78, 0.3)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
          }
        }}
        onMouseLeave={(e) => {
          if (!showConfirm) {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
          }
        }}
        title={showConfirm ? 'Click again to confirm reset' : 'Reset All Data'}
      >
        <RefreshIcon />
      </button>

      {importStatus !== 'idle' && (
        <span
          className="text-sm font-semibold animate-slide-up"
          style={{
            color: importStatus === 'success' ? 'rgba(107, 159, 126, 0.9)' : 'rgba(196, 100, 78, 0.9)',
          }}
        >
          {importStatus === 'success' ? 'Import successful!' : 'Import failed'}
        </span>
      )}

      {showConfirm && (
        <span className="text-xs font-semibold animate-slide-up" style={{ color: 'rgba(196, 100, 78, 0.9)' }}>
          Click again to confirm
        </span>
      )}
    </div>
  )
}
