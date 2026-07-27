interface ProfileResultPageProps {
  params: { id: string };
}

export default function ProfileResultPage({ params }: ProfileResultPageProps) {
  return <h1>Profile {params.id}</h1>;
}
