import { Request, Response } from "express";

export const healthCheck = async (_: Request, res: Response): Promise<void> => {
  res.status(200).json({
    timestamp: new Date().toISOString(),
  });
};
