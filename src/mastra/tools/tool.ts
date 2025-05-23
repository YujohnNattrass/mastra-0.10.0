import { createTool } from '@mastra/core';
import * as cheerio from 'cheerio';
import { z } from 'zod';

export const tool = createTool({
  id: 'tool',
  description: 'Tool description',
  inputSchema: z.object({
    url: z.string().describe('URL to scrape'),
  }),
  outputSchema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
  }),
  execute: async ({ context }) => {
    const $ = cheerio.load(await fetch(context.url).then((res) => res.text()));
    return {
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content') || '',
      content: $('body').text(),
    };
  },
})