type TagBadgeListProps = {
  tags?: string[];
  className?: string;
};

export default function TagbadgeList({
  tags = [],
  className = "",
}: TagBadgeListProps) {
  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
