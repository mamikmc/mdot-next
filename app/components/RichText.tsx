"use client";
type Props = {
  content: string;
};

export default function RichText({ content }: Props) {
  return (
    <div
      className="
          prose prose-gray max-w-none
          [&_figure]:sm:float-left
          [&_figure]:sm:mr-6
          [&_figure]:sm:mb-4
          [&_figure]:clear-both
          [&_img]:rounded-lg
          [&_p]:clear-none
        "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
