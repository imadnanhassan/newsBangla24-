"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Bold,
  Italic,
  Underline,
  List,
  Link,
  Image,
  Upload,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Palette,
} from "lucide-react";

interface SimpleTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}

const SimpleTextEditor = ({
  value,
  onChange,
  placeholder,
  className,
  error,
  onImageUpload,
}: SimpleTextEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Update content when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Update parent component after formatting
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!onImageUpload) {
      const imageUrl = URL.createObjectURL(file);
      insertImage(imageUrl);
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await onImageUpload(file);
      insertImage(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const insertImage = (url: string) => {
    const img = document.createElement("img");
    img.src = url;
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "0.5rem";
    img.style.margin = "1rem 0";

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.insertNode(img);
      range.setStartAfter(img);
      range.setEndAfter(img);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (editorRef.current) {
      editorRef.current.appendChild(img);
    }

    handleInput();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const insertImageFromUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      insertImage(url);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      handleFormat("createLink", url);
    }
  };

  return (
    <div
      className={`${className} ${
        error ? "border-red-300" : "border-gray-200"
      } ${isFocused ? " ring-blue-100" : ""}`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100">
        {/* Text Formatting */}
        <div className="flex items-center space-x-1">
          <select
            onChange={(e) => handleFormat("formatBlock", e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white hover:border-blue-400 transition-colors"
            title="Heading"
          >
            <option value="div">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
          </select>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        {/* Basic Formatting */}
        <div className="flex items-center space-x-1">
          <motion.button
            type="button"
            onClick={() => handleFormat("bold")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Bold (Ctrl+B)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bold className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleFormat("italic")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Italic (Ctrl+I)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Italic className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleFormat("underline")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Underline (Ctrl+U)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Underline className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        {/* Text Color */}
        <div className="flex items-center space-x-1">
          <input
            type="color"
            onChange={(e) => handleFormat("foreColor", e.target.value)}
            className="w-8 h-8 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
            title="Text Color"
          />
          <input
            type="color"
            onChange={(e) => handleFormat("backColor", e.target.value)}
            className="w-8 h-8 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
            title="Background Color"
          />
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        {/* Alignment */}
        <div className="flex items-center space-x-1">
          <motion.button
            type="button"
            onClick={() => handleFormat("justifyLeft")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Align Left"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AlignLeft className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleFormat("justifyCenter")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Align Center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AlignCenter className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleFormat("justifyRight")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Align Right"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AlignRight className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        {/* Lists */}
        <div className="flex items-center space-x-1">
          <motion.button
            type="button"
            onClick={() => handleFormat("insertUnorderedList")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Bullet List"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <List className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleFormat("insertOrderedList")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Numbered List"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Type className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        {/* Special Formatting */}
        <div className="flex items-center space-x-1">
          <motion.button
            type="button"
            onClick={() => handleFormat("formatBlock", "blockquote")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Quote"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Quote className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleFormat("formatBlock", "pre")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Code Block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>

        <div className="w-px h-8 bg-gray-300 mx-2" />

        {/* Links and Media */}
        <div className="flex items-center space-x-1">
          <motion.button
            type="button"
            onClick={insertLink}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Insert Link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link className="w-4 h-4 text-gray-600" />
          </motion.button>
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
              title="Upload Image"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-4 h-4 text-gray-600" />
              )}
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <motion.button
            type="button"
            onClick={insertImageFromUrl}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Insert Image from URL"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPaste={(e) => {
          const items = Array.from(e.clipboardData?.items || []);
          const imageItem = items.find((item) =>
            item.type.startsWith("image/")
          );

          if (imageItem) {
            e.preventDefault();
            const file = imageItem.getAsFile();
            if (file) {
              handleImageUpload(file);
            }
          }
        }}
        onKeyDown={(e) => {
          if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
              case "b":
                e.preventDefault();
                handleFormat("bold");
                break;
              case "i":
                e.preventDefault();
                handleFormat("italic");
                break;
              case "u":
                e.preventDefault();
                handleFormat("underline");
                break;
              case "k":
                e.preventDefault();
                insertLink();
                break;
            }
          }
        }}
        className="p-6 min-h-[400px] focus:outline-none text-gray-900 leading-relaxed"
        style={{
          minHeight: "400px",
          direction: "ltr",
          textAlign: "left",
          fontSize: "16px",
          lineHeight: "1.7",
        }}
        data-placeholder={placeholder}
        dir="ltr"
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          font-style: italic;
        }

        [contenteditable] h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          line-height: 1.2;
          color: #1f2937;
        }

        [contenteditable] h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 1.25rem 0 0.875rem 0;
          line-height: 1.3;
          color: #1f2937;
        }

        [contenteditable] h3 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 1rem 0 0.75rem 0;
          line-height: 1.4;
          color: #1f2937;
        }

        [contenteditable] h4 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.875rem 0 0.625rem 0;
          line-height: 1.4;
          color: #1f2937;
        }

        [contenteditable] h5 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
          line-height: 1.5;
          color: #1f2937;
        }

        [contenteditable] h6 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.625rem 0 0.5rem 0;
          line-height: 1.5;
          color: #1f2937;
        }

        [contenteditable] p {
          margin: 0.75rem 0;
          line-height: 1.8;
          color: #374151;
        }

        [contenteditable] blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f8fafc;
          padding: 1rem 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        [contenteditable] pre {
          background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          font-family: "JetBrains Mono", "Fira Code", "Courier New", monospace;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        [contenteditable] ul,
        [contenteditable] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        [contenteditable] li {
          margin: 0.5rem 0;
          line-height: 1.7;
          color: #374151;
        }

        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.2s;
        }

        [contenteditable] a:hover {
          color: #1d4ed8;
        }

        [contenteditable] strong,
        [contenteditable] b {
          font-weight: 700;
          color: #1f2937;
        }

        [contenteditable] em,
        [contenteditable] i {
          font-style: italic;
          color: #4b5563;
        }

        [contenteditable] u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default SimpleTextEditor;
