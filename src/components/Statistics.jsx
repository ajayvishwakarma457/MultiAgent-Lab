import './Statistics.css'

const Statistics = ({ totalCount, completedCount }) => {
  const completionPercentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="statistics-panel" aria-live="polite" aria-atomic="true">
      <div className="stat-item">
        <span className="stat-label">Total</span>
        <span className="stat-value">{totalCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Completed</span>
        <span className="stat-value">{completedCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Progress</span>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${completionPercentage}%` }}
          />
          <span className="stat-value">{completionPercentage}%</span>
        </div>
      </div>
    </div>
  )
}

export default Statistics
