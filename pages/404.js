import Link from 'next/link';

export default function FourOhFour() {
  return (
    <div style={{
      height: '500px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <h1 style={{ fontSize: '60px' }}>404 | Page Not Found</h1>
      <Link href="/admin" style={{ fontSize: '20px' }}>
        Go back home
      </Link>
    </div>
  );
}
