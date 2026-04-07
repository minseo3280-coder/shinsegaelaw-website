import PlaceholderPage from "@/components/templates/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="명예훼손"
      breadcrumb={[
        { label: "가사관련 형사소송", href: "/practice/criminal" },
        { label: "명예훼손" },
      ]}
    />
  );
}
