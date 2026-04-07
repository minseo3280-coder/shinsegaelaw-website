import PlaceholderPage from "@/components/templates/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="재산 관련 범죄"
      breadcrumb={[
        { label: "가사관련 형사소송", href: "/practice/criminal" },
        { label: "재산 관련 범죄" },
      ]}
    />
  );
}
