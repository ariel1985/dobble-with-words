import uniqueId from 'lodash/uniqueId';
import { createLogic, Logic } from 'redux-logic';
import { appendImages, generatePdfComplete, removeAll } from './actions';
import { textToImage, fileToDataUrl, generatePdf, getImageRatio, sleep } from './lib';
import {
  CardImage,
  GENERATE_PDF,
  GeneratePdfAction,
  LOAD_EXAMPLES,
  State,
  UPLOAD_IMAGES,
  UploadImagesAction,
  TEXT_TO_IMAGE,
  TextToImageAction,
} from './types';

// import { generate } from 'text-to-image';

export const textToImageLogic = createLogic({
  type: TEXT_TO_IMAGE,
  async process({ action }: { action: TextToImageAction }, dispatch, done) {
    const text = action.payload;

    const base64src = await textToImage(text)
    const image: CardImage = {
      base64src,
      id: uniqueId('image_'),
      ratio: await getImageRatio(base64src),
      title: action.payload,
    };

    const images: CardImage[] = [image];
    dispatch(appendImages(images));
    done();
  }, // ./async process
}); // ./createLogic
export const uploadImagesLogic = createLogic({
  type: UPLOAD_IMAGES,
  async process({ action }: { action: UploadImagesAction }, dispatch, done) {
    const images: CardImage[] = await Promise.all(
      action.payload.map(async image => {
        const base64src = await fileToDataUrl(image);
        return {
          base64src,
          id: uniqueId('image_'),
          ratio: await getImageRatio(base64src),
          title: image.name,
        };
      }),
    );

    dispatch(appendImages(images));
    done();
  },
});

export const generatePdfLogic = createLogic({
  type: GENERATE_PDF,
  latest: true,
  validate(
    { action, getState }: { action: GeneratePdfAction; getState: () => State },
    allow,
    reject,
  ) {
    const { processing } = getState();
    if (processing) {
      // Allow only single operation at a time
      reject(action);
    } else {
      allow(action);
    }
  },
  async process(
    { action, getState }: { action: GeneratePdfAction; getState: () => State },
    dispatch,
    done,
  ) {
    const { settings, images } = getState();

    // Unlock the thread before heavy computations starts
    await sleep(100);

    const pdf = await generatePdf(images, {
      ...settings,
      ...action.payload,
    }).catch((err: Error) => alert(err.message));

    if (pdf) {
      if (import.meta.env.NODE_ENV === 'production') {
        // Force file download
        await pdf.save('Cards.pdf', { returnPromise: true });
      } else {
        // Easier mode to preview during development
        window.open(URL.createObjectURL(pdf.output('blob')));
      }
    }
    dispatch(generatePdfComplete());
    done();
  },
});

// const images: CardImage[] = await Promise.all(
//   shuffle(exampleFiles).map(async file => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     const base64src = (await import(`/src/assets/${file}`)) as string;
//     return {
//       base64src,
//       id: uniqueId('image_'),
//       ratio: await getImageRatio(base64src),
//       title: file,
//     };
//   }),
// );

const paths = import.meta.glob('/src/assets/animals/*.png', { eager: true })

export const loadExamplesLogic = createLogic({
  type: LOAD_EXAMPLES,
  latest: true,
  async process(obj, dispatch, done) {
    dispatch(removeAll());

    const bases = []
    for (const path in paths) {
      const base64src = new URL(path, import.meta.url).href
      bases.push(base64src)
    }
    const images: CardImage[] = await Promise.all(
      bases.map(async (base64src, id) => {
        return {
          base64src,
          id: uniqueId(`image_${id}`),
          ratio: await getImageRatio(base64src),
          title: id,
        };
      })
    )

    dispatch(appendImages(images));
    done()
  }
});

export default [
  uploadImagesLogic,
  generatePdfLogic,
  loadExamplesLogic,
  textToImageLogic,
] as Logic[];
