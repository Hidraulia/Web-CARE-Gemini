import Link from "next/link";
import Image from "next/image";

export default function Logo({ locale = "es" }: { locale?: string }) {
  return (
    <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Image
        src="/logo.png"
        alt="CARE Mobiliario Logo"
        width={140}
        height={40}
        priority
        style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
      />
    </Link>
  );
}
