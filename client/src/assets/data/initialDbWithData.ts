import products from './products';
import { ignoreScrRefPath } from '../../util';

(async () => {
  await Promise.all(
    products.map(async (product) => {
      const response = await fetch(product.imgUrl);
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (key.toLowerCase() === 'imgUrl'.toLowerCase()) return;
        formData.set(key, value.toString());
      });

      const filename = product.imgUrl.split('/').slice(-1).pop()!;
      const imageBlob = await response.blob();

      formData.set(
        'image',
        new File([imageBlob], filename, { type: imageBlob.type })
      );

      return fetch(ignoreScrRefPath('localhost:5001/product'), {
        body: formData,
        method: 'POST',
      }).then((res) =>
        res.json().then(({ data }) => {
          return Promise.all<any>(
            product.reviews.map((review) => {
              return fetch(
                ignoreScrRefPath(`localhost:5001/review/${data._id}`),
                {
                  method: 'POST',
                  body: JSON.stringify(review),
                  headers: { 'Content-Type': 'application/json' },
                }
              ).then((response) => response.json());
            })
          );
        })
      );
    })
  );
})().then(
  () => console.log('done'),
  (e) => console.log(e)
);
