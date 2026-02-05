import React from 'react'

function VideoOverlay({ visible, src, onClose }) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
      <video
        src={src}
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        controls
        onEnded={onClose}
      />
    </div>
  )
}

export default VideoOverlay
