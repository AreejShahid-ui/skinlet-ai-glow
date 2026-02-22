const ScanOverlay = ({ scanning }: { scanning: boolean }) => (
  <svg
    viewBox="0 0 400 400"
    className="absolute inset-0 w-full h-full pointer-events-none"
  >
    {/* Face oval guide */}
    <ellipse
      cx="200"
      cy="190"
      rx="110"
      ry="140"
      fill="none"
      stroke="hsl(160, 55%, 42%)"
      strokeWidth="2"
      strokeDasharray="8 6"
      className={scanning ? "animate-scan-pulse" : "opacity-40"}
    />
    {/* Corner brackets */}
    {[
      "M 90 100 L 90 70 L 120 70",
      "M 310 100 L 310 70 L 280 70",
      "M 90 280 L 90 310 L 120 310",
      "M 310 280 L 310 310 L 280 310",
    ].map((d, i) => (
      <path
        key={i}
        d={d}
        fill="none"
        stroke="hsl(160, 55%, 42%)"
        strokeWidth="3"
        strokeLinecap="round"
        className={scanning ? "animate-scan-pulse" : "opacity-50"}
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
    {/* Scanning line */}
    {scanning && (
      <line
        x1="100"
        y1="190"
        x2="300"
        y2="190"
        stroke="hsl(160, 55%, 42%)"
        strokeWidth="2"
        opacity="0.6"
      >
        <animate
          attributeName="y1"
          values="70;310;70"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="70;310;70"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </line>
    )}
  </svg>
);

export default ScanOverlay;
