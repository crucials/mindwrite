// This file contains types that are used in more than one file
export type DropDownItem = {
    translationKey : string,
    value : string,
}


export interface NotesDocument {
    id : number
    title : string,
    mainColor : string,
    creationDate : string
    content : Block[]
}

export type ImportedDocument = {
    id? : number,
    title? : string,
    mainColor? : string,
    creationDate? : string
    content? : Partial<Block>[]
}

export type Block = {
    id : number
    blockName : string,
    text : string,
    checked : boolean
    state : string
}


export interface Template {
    name : string,
    content : Block[]
}