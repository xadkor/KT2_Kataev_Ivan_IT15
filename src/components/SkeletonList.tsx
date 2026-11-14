// Серые заглушки, пока список загружается
export function SkeletonList() {
  return (
    <div aria-busy="true" aria-label="Загрузка списка">
      {Array.from({ length: 8 }, (_, i) => (
        <div className="skeleton-row" key={i}>
          <div className="skeleton skeleton--circle" />
          <div className="skeleton-lines">
            <div className="skeleton skeleton--line" style={{ width: '45%' }} />
            <div className="skeleton skeleton--line" style={{ width: '25%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
