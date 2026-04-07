import PlaceholderPage from "@/components/templates/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="이혼준비"
      breadcrumb={[
        { label: "이혼소송", href: "/practice/divorce" },
        { label: "이혼준비" },
      ]}
    />
  );
}
