export default function OverviewReBills() {
  const data = [
    { name: "Paid Bills", bill: 190.0, theme: "#277c78" },
    { name: "Total Upcoming", bill: 194.98, theme: "#f2cdac" },
    { name: "Due Soon", bill: 59.98, theme: "#82c9d7" },
  ];
  const capsules = data.map((item) => (
    <div
      key={item.name}
      className="bill-capsule"
      style={{ "--theme": item.theme } as React.CSSProperties}
    >
      <h4>{item.name}</h4>
      <h4>
        <strong>${item.bill}</strong>
      </h4>
    </div>
  ));
  return <div className="overviewRecurring">{capsules}</div>;
}
