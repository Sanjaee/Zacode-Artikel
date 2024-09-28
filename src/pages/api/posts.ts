import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        include: {
          contentSections: true,
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  } else if (req.method === 'POST') {
    const { title, content, description, image, category, contentSections } = req.body;

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          description,
          image,
          category,
          contentSections: {
            create: contentSections,
          },
        },
        include: {
          contentSections: true,
        },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}