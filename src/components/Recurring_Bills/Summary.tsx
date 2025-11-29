export default function Summary() {
  const data = [
    { name: "Paid Bills", bill: 190.0, theme: "#277c78" },
    { name: "Total Upcoming", bill: 194.98, theme: "#f2cdac" },
    { name: "Due Soon", bill: 59.98, theme: "#82c9d7" },
  ];
  return (
    <div className="white-card">
      <h3>Summary</h3>
      {data.map((item) => (
        <div className="list-style" key={item.name}>
          <h4>{item.name}</h4>
          <h4>
            <strong>4 $({item.bill})</strong>
          </h4>
        </div>
      ))}
    </div>
  );
}
