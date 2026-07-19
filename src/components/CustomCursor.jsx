import { useCursor } from '../hooks/useCursor';

export function CustomCursor() {
  const { position, hovered } = useCursor();

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--text-white)',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) ${hovered ? 'scale(0)' : 'scale(1)'}`,
          opacity: hovered ? 0 : 1,
          transition: 'transform 0.15s ease-out, opacity 0.15s ease-out'
        }}
      />
      <div
        className="cursor-ring"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99998,
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: hovered ? '52px' : '32px',
          height: hovered ? '52px' : '32px',
          border: '1px solid',
          borderColor: hovered ? 'var(--apple-blue, #007aff)' : 'rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease'
        }}
      />
    </>
  );
}
