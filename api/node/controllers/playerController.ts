import { Request, Response } from 'express';

export const list = (req: Request, res: Response): void => {
    res.status(200).json("Listing users");
};

export const register = (req: Request, res: Response): void => {
    
    res.status(200).json("Listing users");
};
