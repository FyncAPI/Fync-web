import {
  ImageMagick,
  IMagickImage,
  initializeImageMagick,
  MagickFormat,
} from "imagemagick";

await initializeImageMagick(); // make sure to initialize first!

export const optimizeImage = async (
  image: File,
  size?: { w: number; h: number },
) => {
  const bufar = await image.arrayBuffer();
  const data = new Uint8Array(bufar);
  let optImgData = new Uint8Array();

  ImageMagick.read(data, (img: IMagickImage) => {
    img.resize(size?.w || 720, size?.h || 720);
    img.write((data: Uint8Array) => {
      optImgData = data;
    }, MagickFormat.Jpeg);
  });

  const optimizedImage = new File([optImgData], image.name, {
    type: "image/jpeg",
  });

  return optimizedImage;
};
