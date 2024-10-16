import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Editor: React.FC = () => {
  const [title, setTitle] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
    ],
    content: '<p>Start writing your article here...</p>',
  });

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter the URL:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  const saveArticle = () => {
    const content = editor?.getHTML();
    console.log('Saving article:', { title, content });
    // Here you would typically send this data to your backend
  };

  return (
    <div className="container mx-auto p-4">
      <Input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4">
        <Button onClick={addImage} className="mr-2">Add Image</Button>
        <Button onClick={addLink} className="mr-2">Add Link</Button>
      </div>
      <EditorContent editor={editor} className="border p-4 min-h-[400px]" />
      <Button onClick={saveArticle} className="mt-4">Save Article</Button>
    </div>
  );
};