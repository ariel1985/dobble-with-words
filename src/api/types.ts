// Redux store state
export interface State {
  images: CardImage[]
  processing: boolean
  settings: Settings
}

// Possible redux action types
export const APPEND_IMAGES = 'APPEND_IMAGES'
export const GENERATE_PDF = 'GENERATE_PDF'
export const GENERATE_PDF_COMPLETE = 'GENERATE_PDF_COMPLETE'
export const LOAD_EXAMPLES = 'LOAD_EXAMPLES';
export const TEXT_TO_IMAGE = 'TEXT_TO_IMAGE'
export const REMOVE_ALL = 'REMOVE_ALL'
export const REMOVE_IMAGE = 'REMOVE_IMAGE'
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES'
export const SET_SETTINGS = 'SET_SETTINGS'
export const LOAD_URLS = 'LOAD_URLS'

// Payload types
export type Prime = 2 | 3 | 5 | 7 | 11

export interface Settings {
  pageWidth: number // Page width in mm
  pageHeight: number // Page height in mm
  cardRadius: number // Size of a single card
  symbolMargin: number // Percent of card radius
  rotateSymbols: boolean // Whether the symbols should be randomly rotated
}

export interface CardImage {
  base64src: string
  id: string
  ratio: number
  title?: string
}

export interface CardSymbol {
  image: CardImage
  x: number
  y: number
  width: number
  height: number
  rotation: number
}

export interface TextImageParams {
  text: string
  bgColor: string
  textColor: string
  font: string
}

// Action types

export interface TextToImageAction {
  type: typeof TEXT_TO_IMAGE
}
export interface AppendImagesAction {
  type: typeof APPEND_IMAGES
  payload: CardImage[]
}

export interface GeneratePdfAction {
  type: typeof GENERATE_PDF
  payload: {
    n: Prime
  }
}

export interface GeneratePdfCompleteAction {
  type: typeof GENERATE_PDF_COMPLETE
}


export interface LoadExamplesAction {
  type: typeof LOAD_EXAMPLES;
}

export interface LoadUrlsAction {
  type: typeof LOAD_URLS
  payload: string[]
}

export interface TextToImageAction {
  type: typeof TEXT_TO_IMAGE
  payload: TextImageParams
}

export interface RemoveAllAction {
  type: typeof REMOVE_ALL
}

export interface RemoveImageAction {
  type: typeof REMOVE_IMAGE
  payload: string
}

export interface UploadImagesAction {
  type: typeof UPLOAD_IMAGES
  payload: File[]
}
export interface SetSettingsAction {
  type: typeof SET_SETTINGS
  payload: Partial<Settings>
}

export type Actions =
  | AppendImagesAction
  | GeneratePdfAction
  | GeneratePdfCompleteAction
  | LoadExamplesAction
  | LoadUrlsAction
  | TextToImageAction
  | RemoveAllAction
  | RemoveImageAction
  | UploadImagesAction
  | SetSettingsAction
