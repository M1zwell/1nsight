import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Article {
  id: string;
  title: string;
  createdAt: string;
}

export const CMSMain: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', title: 'Sample Article 1', createdAt: '2024-04-14' },
    { id: '2', title: 'Sample Article 2', createdAt: '2024-04-15' },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Content Management System</h1>
      <Link to="/editor/new">
        <Button className="mb-4">Create New Article</Button>
      </Link>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Created: {article.createdAt}</p>
              <Link to={`/editor/${article.id}`}>
                <Button variant="outline" className="mt-2">Edit</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};