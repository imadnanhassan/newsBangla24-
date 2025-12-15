'use client';

import { useState, useRef } from 'react';
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
  Palette
} from 'lucide-react';

interface SimpleTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  onImageUpload?: (file: File) => Promise<string>; // Returns image URL after upload
}

const SimpleTextEditor = ({ value, onChange, placeholder, className, error, onImageUpload }: SimpleTextEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    onChange(content);
  };

  const handleImageUpload = async (file: File) => {
    if (!onImageUpload) {
      // Fallback: create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      handleFormat('insertImage', imageUrl);
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await onImageUpload(file);
      handleFormat('insertImage', imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const insertImageFromUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      handleFormat('insertImage', url);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      handleFormat('createLink', url);
    }
  };

  return (
    <div className={`${className} ${error ? 'border-red-300' : 'border-gray-200'} ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-gray-50">
        {/* Text Formatting */}
        <div className="flex items-center space-x-1">
          <select
            onChange={(e) => handleFormat('formatBlock', e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
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
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Basic Formatting */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleFormat('bold')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('italic')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('underline')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Text Color */}
        <div className="flex items-center space-x-1">
          <input
            type="color"
            onChange={(e) => handleFormat('foreColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Text Color"
          />
          <input
            type="color"
            onChange={(e) => handleFormat('backColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Background Color"
          />
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Alignment */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleFormat('justifyLeft')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('justifyCenter')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('justifyRight')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Lists */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleFormat('insertUnorderedList')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('insertOrderedList')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Numbered List"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Special Formatting */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleFormat('formatBlock', 'blockquote')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('formatBlock', 'pre')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Links and Media */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={insertLink}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-2 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
              title="Upload Image"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <button
            type="button"
            onClick={insertImageFromUrl}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Image from URL"
          >
            <Image className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPaste={(e) => {
          // Handle image paste
          const items = Array.from(e.clipboardData?.items || []);
          const imageItem = items.find(item => item.type.startsWith('image/'));
          
          if (imageItem) {
            e.preventDefault();
            const file = imageItem.getAsFile();
            if (file) {
              handleImageUpload(file);
            }
          }
        }}
        onKeyDown={(e) => {
          // Handle keyboard shortcuts
          if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
              case 'b':
                e.preventDefault();
                handleFormat('bold');
                break;
              case 'i':
                e.preventDefault();
                handleFormat('italic');
                break;
              case 'u':
                e.preventDefault();
                handleFormat('underline');
                break;
              case 'k':
                e.preventDefault();
                insertLink();
                break;
            }
          }
        }}
        className="p-4 min-h-[300px] focus:outline-none prose max-w-none"
        style={{ minHeight: '300px' }}
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
          line-height: 1.2;
        }
        
        [contenteditable] h2 {
          font-size: 1.75rem;
          font-weight: bold;
          margin: 0.875rem 0;
          line-height: 1.3;
        }
        
        [contenteditable] h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
          line-height: 1.4;
        }
        
        [contenteditable] h4 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.625rem 0;
          line-height: 1.4;
        }
        
        [contenteditable] h5 {
          font-size: 1.125rem;
          font-weight: bold;
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        
        [contenteditable] h6 {
          font-size: 1rem;
          font-weight: bold;
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        
        [contenteditable] p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          margin: 1rem 0;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 2rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
          line-height: 1.6;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        [contenteditable] a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
};

export default SimpleTextEditor;