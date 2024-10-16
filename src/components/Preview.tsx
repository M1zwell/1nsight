import React from 'react';

interface PreviewProps {
  content: string;
}

export const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Article Preview</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};