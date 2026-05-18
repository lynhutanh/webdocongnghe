import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/shop',
    permanent: true
  }
});

export default function IndexPage() {
  return null;
}
