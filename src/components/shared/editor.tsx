"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {TextStyle} from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Code,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Type,
  Upload,
  Link2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something awesome...",
  className = "",
}: RichTextEditorProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [textColor, setTextColor] = useState("#000000");
  const [currentHeading, setCurrentHeading] = useState("paragraph");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Subscript,
      Superscript,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      updateCurrentHeading();
    },
    onSelectionUpdate: () => {
      updateCurrentHeading();
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[120px] p-4",
        "data-placeholder": placeholder,
      },
    },
    immediatelyRender: false,
  });

  // Update current heading state based on cursor position
  const updateCurrentHeading = useCallback(() => {
    if (!editor) return;

    if (editor.isActive("heading", { level: 1 })) {
      setCurrentHeading("h1");
    } else if (editor.isActive("heading", { level: 2 })) {
      setCurrentHeading("h2");
    } else if (editor.isActive("heading", { level: 3 })) {
      setCurrentHeading("h3");
    } else {
      setCurrentHeading("paragraph");
    }
  }, [editor]);

  // Set heading or paragraph
  const setHeading = useCallback(
    (type: string) => {
      if (!editor) return;

      switch (type) {
        case "h1":
          editor.chain().focus().setHeading({ level: 1 }).run();
          break;
        case "h2":
          editor.chain().focus().setHeading({ level: 2 }).run();
          break;
        case "h3":
          editor.chain().focus().setHeading({ level: 3 }).run();
          break;
        case "paragraph":
        default:
          editor.chain().focus().setParagraph().run();
          break;
      }
      setCurrentHeading(type);
    },
    [editor]
  );

  // Handle file upload
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Insert image from URL
  const insertImageFromUrl = useCallback(() => {
    if (imageUrl.trim() && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setIsImageDialogOpen(false);
    }
  }, [imageUrl, editor]);

  // Insert image from file
  const insertImageFromFile = useCallback(() => {
    if (selectedImageFile && imagePreview && editor) {
      // In a real application, you would upload the file to your server
      // and get back a URL. For now, we'll use the data URL.
      editor.chain().focus().setImage({ src: imagePreview }).run();
      
      // Reset state
      setSelectedImageFile(null);
      setImagePreview("");
      setIsImageDialogOpen(false);
      
      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }, [selectedImageFile, imagePreview, editor]);

  // Reset image dialog state
  const resetImageDialog = useCallback(() => {
    setImageUrl("");
    setSelectedImageFile(null);
    setImagePreview("");
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, []);

  const insertLink = useCallback(() => {
    if (linkUrl.trim() && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setIsLinkDialogOpen(false);
    }
  }, [linkUrl, editor]);

  const setColor = useCallback(() => {
    if (editor) {
      editor.chain().focus().setColor(textColor).run();
      setIsColorDialogOpen(false);
    }
  }, [textColor, editor]);

  const insertTable = useCallback(() => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  // Initialize heading state and update content when value changes
  useEffect(() => {
    if (editor) {
      updateCurrentHeading();
    }
  }, [editor, updateCurrentHeading]);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 p-2">
        {/* Heading Selector */}
        <Select value={currentHeading} onValueChange={setHeading}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Normal</SelectItem>
            <SelectItem value="h1">Heading 1</SelectItem>
            <SelectItem value="h2">Heading 2</SelectItem>
            <SelectItem value="h3">Heading 3</SelectItem>
          </SelectContent>
        </Select>

        {/* Text Formatting */}
        <Button
          type="button"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("underline") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("strike") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        {/* Text Color Dialog */}
        <Dialog open={isColorDialogOpen} onOpenChange={setIsColorDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="sm">
              <Type className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Text Color</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsColorDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={setColor}>Apply Color</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Lists */}
        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        {/* Text Alignment */}
        <Button
          type="button"
          variant={
            editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
          }
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={
            editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
          }
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={
            editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
          }
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        {/* Superscript/Subscript */}
        <Button
          type="button"
          variant={editor.isActive("superscript") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        >
          <SuperscriptIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("subscript") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        >
          <SubscriptIcon className="h-4 w-4" />
        </Button>

        {/* Code and Quote */}
        <Button
          type="button"
          variant={editor.isActive("code") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </Button>

        {/* Link Dialog */}
        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant={editor.isActive("link") ? "default" : "ghost"}
              size="sm"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsLinkDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={insertLink}>Insert Link</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Enhanced Image Dialog */}
        <Dialog 
          open={isImageDialogOpen} 
          onOpenChange={(open) => {
            setIsImageDialogOpen(open);
            if (!open) {
              resetImageDialog();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="sm">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  URL
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image-upload">Choose Image</Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                  
                  {imagePreview && (
                    <div className="space-y-2">
                      <Label>Preview:</Label>
                      <div className="border rounded-lg p-2">
                        <img 
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-auto max-h-48 mx-auto rounded"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsImageDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={insertImageFromFile}
                      disabled={!selectedImageFile}
                    >
                      Insert Image
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsImageDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={insertImageFromUrl}
                      disabled={!imageUrl.trim()}
                    >
                      Insert Image
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Table */}
        <Button type="button" variant="ghost" size="sm" onClick={insertTable}>
          <TableIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div className="min-h-32">
        <EditorContent editor={editor} />
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 120px;
          padding: 1rem;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.2;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.3;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }

        .ProseMirror p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }

        .ProseMirror th,
        .ProseMirror td {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          vertical-align: top;
        }

        .ProseMirror th {
          background-color: #f9fafb;
          font-weight: bold;
        }

        .ProseMirror .selectedCell:after {
          background: rgba(200, 200, 255, 0.4);
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          position: absolute;
          pointer-events: none;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          margin: 1rem 0;
          padding-left: 1rem;
          color: #6b7280;
        }

        .ProseMirror code {
          background-color: #f3f4f6;
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          font-family: "Courier New", monospace;
          font-size: 0.875em;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.25rem;
          margin: 0.5rem 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          margin: 0.5rem 0;
          padding-left: 2rem;
        }

        .ProseMirror li {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
}