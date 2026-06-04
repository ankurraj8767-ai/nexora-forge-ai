export default function NeonStroke() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 400 80"
        className="w-full max-w-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer glow layers */}
        <text
          x="50%"
          y="55"
          textAnchor="middle"
          className="neon-path"
          style={{ fontSize: '48px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, stroke: '#22D3EE', strokeWidth: 3, opacity: 0.3 }}
        >
          prompt
        </text>
        <text
          x="50%"
          y="55"
          textAnchor="middle"
          className="neon-path"
          style={{ fontSize: '48px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, stroke: '#22D3EE', strokeWidth: 2, opacity: 0.6, animationDelay: '0.1s' }}
        >
          prompt
        </text>
        {/* Main neon stroke */}
        <text
          x="50%"
          y="55"
          textAnchor="middle"
          className="neon-path"
          style={{ fontSize: '48px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}
        >
          prompt
        </text>
        {/* Inner white highlight */}
        <text
          x="50%"
          y="55"
          textAnchor="middle"
          className="neon-inner"
          style={{ fontSize: '48px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, stroke: '#FFFFFF', strokeWidth: 1 }}
        >
          prompt
        </text>
      </svg>
    </div>
  );
}
