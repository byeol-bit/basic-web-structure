interface PageHeaderProps {
  category: string;
  title: string;
  description: string;
}

function PageHeader({
  category,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="mb-6">
      {/* 페이지의 상위 분류를 표시합니다. */}
      <p className="text-sm font-semibold text-brand">
        {category}
      </p>

      {/* 현재 페이지의 이름을 표시합니다. */}
      <h2 className="mt-1 text-2xl font-bold text-main">
        {title}
      </h2>

      {/* 현재 페이지의 역할을 간단하게 설명합니다. */}
      <p className="mt-2 text-sm text-sub">
        {description}
      </p>
    </header>
  )
}

export default PageHeader;