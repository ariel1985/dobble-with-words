import uniqueId from 'lodash/uniqueId'
import { createLogic, Logic } from 'redux-logic'
import { appendImages, generatePdfComplete, removeAll } from './actions'
import { textToImage, fileToDataUrl, generatePdf, getImageRatio, sleep, toDataURL } from './lib'
import {
  CardImage,
  GENERATE_PDF,
  GeneratePdfAction,
  State,
  LOAD_URLS,
  UPLOAD_IMAGES,
  UploadImagesAction,
  TEXT_TO_IMAGE,
  TextToImageAction,
  LoadUrlsAction,
} from './types'

export const loadUrlsLogic = createLogic({
  type: LOAD_URLS,
  latest: true,
  async process({ action }: { action: LoadUrlsAction }, dispatch, done) {
    const urls = action.payload

    const blobs = await Promise.all(urls.map(async (url) => await toDataURL(url)))
    const images: CardImage[] = await Promise.all(
      blobs.map(async (base64src, id) => {
        return {
          base64src,
          id: uniqueId('image_'),
          ratio: await getImageRatio(base64src),
          title: id.toString(),
        }
      })
    )

    dispatch(appendImages(images))
    done()
  },
})

export const textToImageLogic = createLogic({
  type: TEXT_TO_IMAGE,
  async process({ action }: { action: TextToImageAction }, dispatch, done) {
    const base64src = await textToImage(action.payload)
    const image: CardImage = {
      base64src,
      id: uniqueId('image_'),
      ratio: await getImageRatio(base64src),
      title: action.payload.text,
    }

    dispatch(appendImages([image]))
    done()
  },
})
export const uploadImagesLogic = createLogic({
  type: UPLOAD_IMAGES,
  async process({ action }: { action: UploadImagesAction }, dispatch, done) {
    const images: CardImage[] = await Promise.all(
      action.payload.map(async (image) => {
        const base64src = await fileToDataUrl(image)
        return {
          base64src,
          id: uniqueId('image_'),
          ratio: await getImageRatio(base64src),
          title: image.name,
        }
      })
    )

    dispatch(appendImages(images))
    done()
  },
})

export const generatePdfLogic = createLogic({
  type: GENERATE_PDF,
  latest: true,
  validate(
    { action, getState }: { action: GeneratePdfAction; getState: () => State },
    allow,
    reject
  ) {
    const { processing } = getState()
    if (processing) {
      // Allow only single operation at a time
      reject(action)
    } else {
      allow(action)
    }
  },
  async process(
    { action, getState }: { action: GeneratePdfAction; getState: () => State },
    dispatch,
    done
  ) {
    const { settings, images } = getState()

    // Unlock the thread before heavy computations starts
    await sleep(100)

    const pdf = await generatePdf(images, {
      ...settings,
      ...action.payload,
    }).catch((err: Error) => alert(err.message))

    if (pdf) {
      if (import.meta.env.NODE_ENV === 'production') {
        // Force file download
        await pdf.save('Cards.pdf', { returnPromise: true })
      } else {
        // Easier mode to preview during development
        window.open(URL.createObjectURL(pdf.output('blob')))
      }
    }
    dispatch(generatePdfComplete())
    done()
  },
})

export default [uploadImagesLogic, generatePdfLogic, loadUrlsLogic, textToImageLogic] as Logic[]
