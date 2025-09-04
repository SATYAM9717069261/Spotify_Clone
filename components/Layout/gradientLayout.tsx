interface GradientLayoutProps {
  color: string;
  children: React.ReactNode;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  roundImage?: boolean;
}

export default function GradientLayout({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}: GradientLayoutProps) {
  return (
    <div
      className={`h-full overflow-y-auto bg-gradient-to-b from-${color}-500 via-${color}-600 to-[rgba(0,0,0,0.95)]`}
    >
      <div className={`flex items-end bg-${color}-600 p-10`}>
        <div className="p-5">
          <img
            src={image}
            alt={title}
            className={`w-40 h-40 shadow-2xl ${
              roundImage ? "rounded-full" : "rounded-md"
            }`}
          />
        </div>

        <div className="p-5 leading-10 text-white">
          <p className="text-[10px] font-bold uppercase">{subtitle}</p>
          <h1 className="text-6xl">{title}</h1>
          <p className="text-[10px]">{description}</p>
        </div>
      </div>

      <div className="py-[50px]">{children}</div>
    </div>
  );
}
