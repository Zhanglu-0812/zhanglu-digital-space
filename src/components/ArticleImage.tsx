import Image from "next/image";
import images from "@/data/article-images.json";

export function ArticleImage({ src, priority = false }: { src: string; priority?: boolean }) {
  const image = images[src as keyof typeof images];
  if (!image) throw new Error(`文章图片缺少尺寸与说明：${src}`);
  const imageUrl = encodeURI(src);

  return (
    <figure className="article-image">
      <a href={imageUrl} target="_blank" rel="noopener noreferrer" aria-label={`${image.alt}（打开大图）`}>
        <Image
          src={imageUrl}
          alt={image.alt}
          width={image.width}
          height={image.height}
          unoptimized
          priority={priority}
          className="h-auto w-full"
        />
      </a>
    </figure>
  );
}
