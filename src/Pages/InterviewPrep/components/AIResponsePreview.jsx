import React, { useState } from "react";
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="max-w-4xl">
      <div className="prose prose-slate max-w-none text-[13.5px] leading-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !match;

              if (!isInline) {
                return (
                  <CodeBlock
                    code={String(children).replace(/\n$/, "")}
                    language={language}
                  />
                );
              }

              return (
                <code
                  className="rounded bg-slate-100 px-1 py-0.5 text-[12px] text-slate-700"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-4 leading-6">{children}</p>;
            },
            strong({ children }) {
              return <strong>{children}</strong>;
            },
            em({ children }) {
              return <em>{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>
              );
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="my-4 border-l-4 border-slate-200 pl-4 italic text-slate-600">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="mb-4 mt-6 text-2xl font-bold">{children}</h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="mb-3 mt-6 text-xl font-bold">{children}</h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="mb-2 mt-5 text-lg font-bold">{children}</h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="mb-2 mt-4 text-base font-bold">{children}</h4>
              );
            },
            a({ href, children }) {
              return (
                <a href={href} className="text-teal-600 hover:underline">
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="my-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 border border-slate-200">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-slate-50">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-slate-200">{children}</tbody>
              );
            },
            tr({ children }) {
              return <tr className="text-left">{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return <td className="px-3 py-2 text-sm">{children}</td>;
            },
            hr() {
              return <hr className="my-4 rounded" />;
            },
            img({ src, alt }) {
              return <img src={src} alt={alt} className="rounded-lg" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-slate-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {language || "text"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="relative flex items-center text-slate-500 hover:text-slate-700"
          aria-label="Copy code"
          type="button"
        >
          {copied ? (
            <LuCheck size={16} className="text-emerald-600" />
          ) : (
            <LuCopy size={16} />
          )}
          {copied && (
            <span className="absolute -top-8 right-0 rounded-md bg-black px-2 py-1 text-xs text-white opacity-80">
              Copied
            </span>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          backgroundColor: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;
