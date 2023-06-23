export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESS': return 200;
    case 'NOT_FOUND': return 404;
    case 'UNAUTHORIZED': return 401;
    default: return 500;
  }
}
