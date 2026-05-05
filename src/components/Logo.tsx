import Link from "next/link";

export default function Logo({ locale = "es", size = "1.5rem" }: { locale?: string, size?: string }) {
  return (
    <Link 
      href={`/${locale}`} 
      style={{ 
        color: 'inherit', 
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <span 
        style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: size, 
          fontWeight: 600, 
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}
      >
        CARE
      </span>
      <span 
        style={{ 
          height: '4px', 
          width: '4px', 
          backgroundColor: 'var(--color-accent)', 
          borderRadius: '50%',
          display: 'inline-block',
          marginBottom: '2px'
        }} 
      />
    </Link>
  );
}
