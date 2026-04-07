import PlaceholderPage from "@/components/templates/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="스토킹 범죄"
      breadcrumb={[
        { label: "가사관련 형사소송", href: "/practice/criminal" },
        { label: "스토킹 범죄" },
      ]}
    />
  );
}
