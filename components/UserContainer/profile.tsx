interface ProfileProps {
  color: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  roundImage?: boolean;
}

export function Profile({
  color,
  image,
  subtitle,
  title,
  description,
  roundImage,
}: ProfileProps) {
  const hasImage = image && image.trim() !== "";
  const firstLetter = title?.charAt(0).toUpperCase() || "?";

  return (
    <div className="h-full">
      <div className={`flex items-end bg-[${color}] p-10`}>
        <div className="p-5">
          {hasImage ? (
            <img
              src={image}
              alt={title}
              className={`w-40 h-40 shadow-2xl ${
                roundImage ? "rounded-full" : "rounded-md"
              }`}
            />
          ) : (
            <div
              className={`w-40 h-40 flex items-center justify-center shadow-2xl text-white text-6xl font-bold
                          ${roundImage ? "rounded-full" : "rounded-md"}`}
              style={{ backgroundColor: "#4F46E5" }}
            >
              {firstLetter}
            </div>
          )}
        </div>
        <div className="p-5 text-white leading-10">
          <p className="text-[10px] font-bold uppercase">{subtitle}</p>
          <h1 className="text-6xl">{title}</h1>
          <p className="text-[10px]">{description}</p>
        </div>
      </div>
    </div>
  );
}
