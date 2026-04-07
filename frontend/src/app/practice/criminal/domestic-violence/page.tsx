import PlaceholderPage from "@/components/templates/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="가정폭력 형사소송"
      breadcrumb={[
        { label: "가사관련 형사소송", href: "/practice/criminal" },
        { label: "가정폭력 형사소송" },
      ]}
    />
  );
}
