export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="empty-state animate-fadeIn">
      {icon || (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}
