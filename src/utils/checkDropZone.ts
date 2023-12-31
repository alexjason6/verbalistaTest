import {items} from '../data/items';

export const checkDropZone = (
  position: {x: number; y: number},
  value: string,
  event: string,
  dropZones: any,
) => {
  for (const dropZone of dropZones) {
    const ok =
      Math.abs(
        Number((position.y - 20).toFixed(0)) - Number(dropZone.y.toFixed(0)),
      ) <= 20;
    const [dropZoneFilter] = dropZones.filter(
      (item: {value: string}) => item.value === value,
    );

    if (ok && dropZoneFilter && dropZone.value === value) {
      const [itemFiltered] = items.filter(item => item.name === value);

      const refreshArray = {
        name: itemFiltered.name,
        value: itemFiltered.value,
        correct: true,
        translate: itemFiltered.translate,
      };

      return [dropZone, refreshArray];
    }
  }
};
