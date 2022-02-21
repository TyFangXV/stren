
import type { NextApiRequest, NextApiResponse } from 'next'
import {getAnimeLink} from '../../utils/scrapper';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const {mal_id} = req.query;

    
    //parse the data
    const data = {
        mal_id: mal_id?.toString().trim(),

    }

    const isValid = Object.values(data).every(value => value !== undefined);
    if(!isValid) res.status(400).json({error: "Invalid data"});

    if(isValid)
    {
        
        const links = await getAnimeLink(`https://gogoanime.fi/${data.mal_id}`);
        if(links === null) res.status(500).json({error: "Could not get anime link"});
        else res.status(200).json(links);
    }

}