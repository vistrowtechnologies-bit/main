import Image from "next/image";
import type { BlogSection } from "@/lib/content-types";

// In-article visuals that sit after a section's text: a step diagram, a table, and/or an image.
// Tables and steps are real HTML so search engines can read them.
export function SectionVisuals({ section }: { section: BlogSection }) {
  return (
    <>
      {section.steps && section.steps.length > 0 && (
        <ol className="mt-7 grid gap-3 sm:grid-cols-2">
          {section.steps.map((step, index) => (
            <li key={`${step.title}-${index}`} className="relative flex gap-4 rounded-lg border border-line bg-surface/70 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-accent-ink">
                {index + 1}
              </span>
              <div>
                <p className="font-display text-base font-bold leading-snug text-ink">{step.title}</p>
                {step.body && <p className="mt-1 font-sans text-sm leading-relaxed text-muted">{step.body}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}

      {section.table && section.table.rows.length > 0 && (
        <figure className="mt-7">
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[480px] border-collapse text-left font-sans text-[15px]">
              {section.table.columns && section.table.columns.length > 0 && (
                <thead className="bg-surface">
                  <tr>
                    {section.table.columns.map((column) => (
                      <th key={column} scope="col" className="border-b border-line px-4 py-3 font-semibold text-ink">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {section.table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-line last:border-b-0">
                    {row.map((cell, cellIndex) =>
                      cellIndex === 0 ? (
                        <th key={cellIndex} scope="row" className="px-4 py-3 align-top font-medium text-ink">
                          {cell}
                        </th>
                      ) : (
                        <td key={cellIndex} className="px-4 py-3 align-top text-ink-2">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.table.caption && (
            <figcaption className="mt-3 font-sans text-sm text-muted">{section.table.caption}</figcaption>
          )}
        </figure>
      )}

      {section.image?.url && (
        <figure className="mt-7">
          <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <Image
              src={section.image.url}
              alt={section.image.alt || section.image.caption || ""}
              width={section.image.width || 1600}
              height={section.image.height || 900}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {section.image.caption && (
            <figcaption className="mt-3 font-sans text-sm text-muted">{section.image.caption}</figcaption>
          )}
        </figure>
      )}
    </>
  );
}
