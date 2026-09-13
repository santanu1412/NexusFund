export default function SkeletonCard() {
  return (
    <div className="card" style={{ cursor: 'default' }}>
      <div className="skeleton" style={{ aspectRatio: '16/9' }} />
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div className="skeleton" style={{ height: '12px', width: '60px', borderRadius: 'var(--radius-full)' }} />
        <div className="skeleton" style={{ height: '20px', width: '85%' }} />
        <div className="skeleton" style={{ height: '14px', width: '60%' }} />
        <div className="skeleton" style={{ height: '8px', width: '100%', marginTop: 'var(--space-2)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton" style={{ height: '14px', width: '90px' }} />
          <div className="skeleton" style={{ height: '14px', width: '70px' }} />
        </div>
      </div>
    </div>
  );
}
