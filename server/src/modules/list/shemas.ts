import { z } from 'zod';

export const AddOrUpdateListSchema = z
  .object({
    content: z
      .number()
      .min(1)
      .max(10 ** 6),
    isChecked: z.boolean().optional()
  })
  .strip();

export type AddOrUpdateListItemType = z.infer<typeof AddOrUpdateListSchema>;

export const PaginationParamsSchema = z
  .object({
    limit: z.coerce.number().min(1).max(50).default(20).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    searchText: z.string().default('').optional()
  })
  .strip();

export type PaginatedListItemType = z.infer<typeof PaginationParamsSchema>;
