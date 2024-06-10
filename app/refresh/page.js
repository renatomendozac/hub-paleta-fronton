import { redirect } from 'next/navigation'

export default async function Refresh ({ searchParams }) {
  const { to = '/' } = searchParams
  redirect(to)
}
