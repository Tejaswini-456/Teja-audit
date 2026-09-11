import "./PackagesByCounter.css";

function PackagesByCounter({ counterData }) {
  const maxPackageCount = Math.max(
    ...counterData.map((item) => item.packageCount),
    0
  );

  const totalCount = counterData.reduce(
    (total, item) => total + item.packageCount,
    0
  );

  return (
    <section className="packages-by-counter">
      <div className="packages-by-counter__header">
        <h2>Packages counted by counter</h2>
        <span>{totalCount} TOTAL</span>
      </div>

      <p className="packages-by-counter__subtitle">
        Count entries submitted
      </p>

      <div className="packages-by-counter__list">
        {counterData.map((item) => {
          const barWidth =
            maxPackageCount === 0
              ? 0
              : (item.packageCount / maxPackageCount) * 100;

          const percentage =
            totalCount === 0
              ? 0
              : Math.round((item.packageCount / totalCount) * 100);

          return (
            <div className="packages-by-counter__item" key={item.counter}>
              <div className="packages-by-counter__item-header">
                <span className="packages-by-counter__name">
                  {item.counter}
                </span>

                <span className="packages-by-counter__value">
                  {item.packageCount} counts - {percentage}%
                </span>
              </div>

              <div className="packages-by-counter__bar-container">
                <div
                  className="packages-by-counter__bar"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PackagesByCounter;