export default function LoadingSpinner({ size = 'default', text = '' }) {
  const sizeClass = size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : '';

  return (
    <div className="flex flex-col items-center justify-center gap-4" style={{ padding: 'var(--space-12) 0' }}>
      <div className={`spinner ${sizeClass}`} />
      {text && <p className="text-sm text-muted">{text}</p>}
    </div>
  );
}
