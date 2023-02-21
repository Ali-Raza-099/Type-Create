import FileSaver from 'file-saver';

import { surpriseMePrompts } from '../constant/index.js';


export const getRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    if (prompt === surpriseMePrompts[randomIndex]) return getRandomPrompt(prompt);
    return surpriseMePrompts[randomIndex];
}

export const downloadImage = async (_id, photo) => {
    FileSaver.saveAs(photo, `downloaded_${_id}.jpg`);
}